const mongoose = require('mongoose');
const passprotLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email:{
        type: String,
        require:true,
        unqiue:true
    }
});

UserSchema.plugin(passprotLocalMongoose);

module.exports = mongoose.model('User',UserSchema);