const {campgroundSchema,reviewSchema} = require('./schemas.js');
const expreeError = require('./utils/ExpressError');
const Campground = require('./models/campground');
const Review = require('./models/review');

module.exports.isLoggedin = (req,res,next) =>{
    
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        
        req.flash('error','You must be signed in first!');
        return res.redirect('/login');
    }
    next();

}

module.exports.validateCampground = (req,res,next) =>{
    
    const {error} = campgroundSchema.validate(req.body);
    
    if(error){
        const msg = error.details.map(el=> el.message).join(',')
        throw new expreeError(msg,400)
    } else{
        next();
    }
    // console.log(error);
}

module.exports.isAuthor = async(req,res,next)=>{
    const id = req.params.id;
    const campground = await Campground.findById(id)
    if(!campground.author.equals(req.user._id)){
        res.flash('error',"You do not have permssion to do that!");
        return res.redirect('/campgrounds/show')
    }
    next();
}

module.exports.validateReview = (req,res,next) =>{
    
    const {error} = reviewSchema.validate(req.body);
    
    if(error){
        const msg = error.details.map(el=> el.message).join(',')
        throw new expreeError(msg,400)
    } else{
        next();
    }
    // console.log(error);
}

module.exports.isReviewAuthor = async(req,res,next)=>{
    const {id,reviewId} = req.params;
    const review = await Review.findById(reviewId)
    if(!review.author.equals(req.user._id)){
        res.flash('error',"You do not have permssion to do that!");
        return res.redirect(`/campgrounds/${id}`)
    }
    next();
}