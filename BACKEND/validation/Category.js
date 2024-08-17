const Joi = require('joi');

const categoryValidationSchema = Joi.object({
  // CategoryID will be auto-incremented in the database, no need to validate it for insertion
  Name: Joi.string().required(),               
  Show: Joi.boolean().required(),              
});

module.exports = { categoryValidationSchema };
