
const Joi = require('joi')

const validateSchema = require('../validateSchema');

module.exports = body => {
    const schema = Joi.object({
        titulo: Joi.string().required(),
        descripcion: Joi.string().required(),
        idUser: Joi.string().required(),
        idColum: Joi.string().required()
    })

   return  validateSchema(schema, body) 
}