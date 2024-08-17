const Joi = require('joi');

const userDetailsValidationSchema = Joi.object({
  
  FName: Joi.string().required(),                      
  LName: Joi.string().required(),                      
  Contact: Joi.string().required(),                    
  DOB: Joi.date().required(),                          
  Address: Joi.string().required(),                    
  Photo: Joi.binary().optional().allow(null),          
});

module.exports = { userDetailsValidationSchema };
