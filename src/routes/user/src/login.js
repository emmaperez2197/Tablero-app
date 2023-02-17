const { Router } = require('express');

const UserModel = require('../../../models/User');
const Bycript = require('../../../../helpers/bcrypt')
const {messageForNonExistantEmail} = require('../../../messages/user/register')
const {mensajes} = require('../../../messages/user/login')
const Token = require('../../../../helpers/JwtToken')

const app = Router();


const handler = async (req, res) => {

    const {email, contraseña} = req.body;

    const checkUserExists = await UserModel.get({email:email})

    console.log(checkUserExists);


    if (!checkUserExists.length) {
        return res.status(200).json({message:messageForNonExistantEmail(), code: 2})
    }

    if (!await Bycript.anHash(contraseña, checkUserExists[0].contraseña ) ) {
        return res.status(400).json( {message:mensajes.passwordInvalid})
    }
 
    delete checkUserExists[0].contraseña

    const data = {
        ...checkUserExists[0]
    }

    const token = Token.sing(data);
    console.log(checkUserExists);
    
    res.status(200).json({message: mensajes.successfulLogin(data.nombre), code: 2, token})
    
}

app.use('/', handler )

module.exports = { app, handler };