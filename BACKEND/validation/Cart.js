const Joi = require('joi');
const cartSchema = Joi.object({
    UserId: Joi.number().integer().required(),
    ProductId: Joi.number().integer().required(),
    Quantity: Joi.number().integer().required(),
    CartAmount: Joi.number().precision(2).required(),

});

module.exports = {cartSchema} ;