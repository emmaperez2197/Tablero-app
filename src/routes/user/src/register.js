const { Router } = require('express');
const User = require('../../../models/User');
const Token = require('../../../../helpers/JwtToken');
const {messageForExistantEmail, messageForEmail, messageForCreatedUser} = require('../../../messages/user/register');
const validate = require('../../../structures/user/register');
const EmailService = require('../../../../services/EmailService')
const createdUserTemplate = require('../../../../services/templates/confirmedRegister')


const app = Router();

const handler = async (req, res) => {


	const {nombre, apellido, email, contraseña} = req.body
	const validateUser = await validate(req.body)

	if(validateUser.error){
		return res.status(400).json(validateUser)
	}

	try {
			checkEmailExists = await User.getOne({email:email})
		
			if (checkEmailExists) {
				return res.status(200).json(messageForExistantEmail())
			}
		
			const data = {
				nombre, 
				apellido,
				email,
				contraseña
			}
		
			const token = Token.sing(data)	
		
			await EmailService.sendEmail(
				email,
				messageForEmail(),
				createdUserTemplate(token)
			)
		
			return res.status(200).json({ message: messageForCreatedUser(), code: 2 });
	} catch (error) {
		return res.status(500).json({ error: error.message, code: -1});
		
	}

};

app.post('/', handler);

module.exports = { app, handler };
