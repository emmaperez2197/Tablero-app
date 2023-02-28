
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi);

const validateSchema = require('../validateSchema');

module.exports = body => {
    const schema = Joi.object({
        titulo: Joi.string().required(),
        descripcion: Joi.string().required(),
        assigned: Joi.objectId()
    })

   return  validateSchema(schema, body) 
}