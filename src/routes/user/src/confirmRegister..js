const { Router } = require('express');
const User = require('../../../models/User');
const Token = require('../../../../helpers/JwtToken');
const Bcrypt = require('../../../../helpers/bcrypt')
const {messageForConfirmedRegistration} = require('../../../messages/user/register');


const app = Router();

const handler = async (req, res) => {

    const verifyToken = await Token.decode(req.params.token)
    delete verifyToken.iat

    const passwordHash = Bcrypt.hashUser(verifyToken.contraseña)

    const newUser = new User({...verifyToken, contraseña: passwordHash})
    
    const userCreated = await newUser.create()

    return res.status(200).json({message: messageForConfirmedRegistration(), userId:userCreated.insertedId, code: 2})
};

app.use('/:token', handler);

module.exports = { app, handler };
