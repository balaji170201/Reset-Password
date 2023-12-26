const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        default:'visitor'
    }
})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;