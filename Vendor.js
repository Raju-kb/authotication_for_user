const mongoose = require('mongoose');
//This code is used to create and store vendor information (like username, email, and password) in a MongoDB database using Mongoose.
const vendorSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    }
})
const Vendor = mongoose.model('Vendor', vendorSchema);
module.exports = Vendor;