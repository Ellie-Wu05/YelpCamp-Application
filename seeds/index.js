const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')
// const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    // .then(()=>{
    //     console.log("Mongo Connection Open!");
    // })
    // .catch(err=>{
    //     console.log(`onno error! ${err}` );
    // })

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open", ()=>{
    console.log("Database connected");
})

const sample=(array)=> array[Math.floor(Math.random() * array.length)];

const seedDB = async()=>{
    await Campground.deleteMany({});
    for(let i=0; i<300; i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*50) +5;
        const camp = new Campground({
            
            author: '6264bc18bd0ce41b0939c5de',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            description: "jwhbfwkjehfkwhjslfkjwlwehfkfkwhefkwjhfw",
            geometry: { type: 'Point', 
                        coordinates: [
                            cities[random1000].longitude,
                            cities[random1000].latitude] 
                        },
            price: price,
            images : [
                {
                  url: 'https://res.cloudinary.com/dftjoqclf/image/upload/v1650868138/YelpCamp/acgqsrdz6jyhbul4csp1.jpg',
                  filename: 'YelpCamp/acgqsrdz6jyhbul4csp1',
              
                },
                {
                  url: 'https://res.cloudinary.com/dftjoqclf/image/upload/v1650868139/YelpCamp/n7uh81gqhs47hv2kudvo.webp',
                  filename: 'YelpCamp/n7uh81gqhs47hv2kudvo',
         
                }
              ]
        })
        await  camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close()
})

