const mongoose = require('mongoose');
const Schema = mongoose.Schema;  


const registerSchema = new Schema({
    first_name: {
        type: String,
        required: true  
    },
    last_name: {
        type: String,
        required: true  
    },
    phone: {
        type: Number,
        required: true  
    },
    email: {
        type: String,
        required: true 
    },
    password: {
        type: String,
        required: true  
    }
}, { timestamps: true }); 

const Register = mongoose.model('User', registerSchema); 

module.exports = Register;
