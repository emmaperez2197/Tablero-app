
const Joi = require('joi')

const validateSchema = require('../validateSchema');

module.exports = body => {
    const schema = Joi.object({
        nombre: Joi.string().required(),
        idUser: Joi.array(),
        idColum: Joi.array()
    })

   return  validateSchema(schema, body) 
}