const Joi = require('joi');

const validateSchema = require('../validateSchema');

module.exports = body => {

	const schema = Joi.object({
        email: Joi.string().email().required(),
        contraseña: Joi.string().min(8).max(16)
        
	});

	return validateSchema(schema, body);
};
