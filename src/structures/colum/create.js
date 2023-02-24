
const Joi = require('joi')

const validateSchema = require('../validateSchema');

module.exports = body => {
    const schema = Joi.object({
        nombre: Joi.string().required(),
        idTickets: Joi.array()
    })

   return  validateSchema(schema, body) 
}