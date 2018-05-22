const mongoose = require('mongoose');
const Joi = require('joi');


const customerSchema = new mongoose.Schema({
    isGold:{
        type: Boolean,
        required: true
    },
    name: {
        type: String, 
        required: true,
        minlength: 1,
        maxlength: 75
    },
    phone: {
        type: String, 
        required: true,
        minlength: 1,
        maxlength: 75
    }
});

const Customer = mongoose.model('Customer', customerSchema)


function validateCustomer(customer){
    const schema ={
        isGold: Joi.boolean().required(),
        name: Joi.string().min(1).max(75).required(),
        phone: Joi.string().min(10).max(75).required(),
    }
    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;