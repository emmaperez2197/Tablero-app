
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi);


const validateSchema = require('../validateSchema');

module.exports = body => {
    const schema = Joi.object({
        titulo: Joi.string().required(),
        descripcion: Joi.string().required(),
        informer: Joi.objectId().required(),
        assigned: Joi.objectId(),
        idColum: Joi.objectId().required(),
    })

   return  validateSchema(schema, body) 
}