const Joi = require('joi');

const transactionSchema = Joi.object({
    TransactionId: Joi.number().integer().required(),
    Amount: Joi.number().required(),
    OrderId: Joi.number().integer().required(),
});

module.exports = {transactionSchema};