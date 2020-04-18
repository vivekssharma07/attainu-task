const mongoose = require('mongoose');

const user = mongoose.Schema({
    first_name: {type:String,required:true},
    last_name: {type:String,required:true},
    email: {type:String,required:true},
    password: {type:String,required:true},
    confirm_password: {type:String,required:true}
},{ timestamps: true })
 
 module.exports = mongoose.model('User', user);