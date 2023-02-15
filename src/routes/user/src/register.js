const { Router } = require('express');
const User = require('../../../models/User');
const {sing} = require('../../../../helpers/JwtToken');
const {messageForExistantEmail} = require('../../../messages/user/register');
const validate = require('../../../structures/user/register');


const app = Router();

const handler = async (req, res) => {


	const {nombre, apellido, email, contraseña} = req.body
	const validateUser = await validate(req.body)

	if(validateUser.error){
		return res.status(400).json(validateUser)
	}

	checkEmailExists = await User.get({email:email})

	if (checkEmailExists.length) {
		return res.status(200).json(messageForExistantEmail())
	}


	console.log('pase');
	const data = {
		nombre, 
		apellido,
		email,
		contraseña
	}

	const token = sing(data)
	console.log(token);

};

app.use('/', handler);

module.exports = { app, handler };
