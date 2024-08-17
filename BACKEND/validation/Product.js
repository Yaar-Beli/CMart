const Joi = require('joi');
const ProductSchema = Joi.object({
    Quantity: Joi.number().integer().optional().allow(null),  
    Name: Joi.string().required(),                            
    Description: Joi.string().optional().allow(null),         
    Price: Joi.number().precision(2).required(),              
    CategoryID: Joi.number().integer().required(),            
    createdAt: Joi.date().required(),                          
    updatedAt: Joi.date().required(),                          
    Show: Joi.boolean().required(),
});

module.exports = {ProductSchema};