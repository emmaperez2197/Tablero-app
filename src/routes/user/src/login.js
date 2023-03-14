const { Router } = require('express');

const UserModel = require('../../../models/User');
const Bycript = require('../../../../helpers/bcrypt')
const {messageForNonExistantEmail} = require('../../../messages/user/register')
const {mensajes} = require('../../../messages/user/login')
const Token = require('../../../../helpers/JwtToken');
// const io = require('socket.io-client');
// const socket = io('http://localhost:7777');

const app = Router();

const handler = async (req, res) => {

    const {email, contraseña} = req.body;
    
    try {
        
        const checkUserExists = await UserModel.getOne({email:email})
    
        if (!checkUserExists) {
            return res.status(200).json({message:messageForNonExistantEmail(), code: 2})
        }
    
        if ( !await Bycript.anHash(contraseña, checkUserExists.contraseña ) ) {
            return res.status(400).json( {message:mensajes.passwordInvalid})
        }
     
        delete checkUserExists.contraseña
    
        const data = {...checkUserExists}
    
        
        const token = await Token.sing(data);
        
        // socket.emit('login', data)
        res.status(200).json({message: mensajes.successfulLogin(data.nombre), code: 2, token})

        
    } catch (error) {
        res.status(500).json({error: error.toString()})
    }

  
}

app.post('/', handler )

module.exports = { app, handler };