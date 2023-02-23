const Joi = require('joi')

const validateSchema = require('../validateSchema');

module.exports = body => {
    const schema = Joi.object({
        oldPassword: Joi.string().required(),
        newPassword: Joi.string().required()
    })

   return  validateSchema(schema, body) 
}