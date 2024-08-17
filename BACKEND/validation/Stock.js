const Joi = require('joi');

const stockSchema = Joi.object({
    ProductID: Joi.number().integer().required(),        
    Quantity: Joi.number().required(),
});

module.exports = {stockSchema};