const Joi = require('joi')

const validateSchema = require('../validateSchema');

module.exports = body => {
    const schema = Joi.object({
        nuevaContraseña: Joi.string().required()
    })

   return  validateSchema(schema, body) 
}