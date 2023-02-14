const { Router } = require('express');
const User = require('../../../models/User')
const {sing} = require('../../../../helpers/JwtToken')
const validate = require('../../../structures/user/register')


const app = Router();

const handler = async (req, res) => {


	const {nombre, apellido, email, contraseña} = req.body
	const validateUser = await validate(req.body)

	if(validateUser.error){
		return res.status(400).json(validateUser)
	}

	checkEmailExists = User.getOne({email})

	res.json(checkEmailExists)

};

app.use('/', handler);

module.exports = { app, handler };
