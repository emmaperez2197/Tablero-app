const { Router } = require('express');


const User = require('../../../models/User');
const {validateToken} = require('../../../../src/middlewares/auth-user');
const validate = require('../../../structures/user/changesPass');
const EmailService = require('../../../../services/EmailService');
const {mensajes} = require('../../../messages/user/login')
const Bcrypt = require('../../../../helpers/bcrypt');


const app = Router();

const handler = async (req, res) => {

    const {oldPassword, newPassword} = req.body

    const validateBody = await validate(req.body)

    if (validateBody.error) {
        return res.status(400).json(validateBody)
    }

    const getUser = await User.getOne({ email: req.jwt.email });

    const {contraseña, _id} = getUser;
    console.log(_id);

    if (! await Bcrypt.anHash(oldPassword, contraseña)) {
        return res.status(400).json({message: mensajes.passwordInvalid, code: 1})
    }

    const hashNewPassword = await Bcrypt.hashUser(newPassword);

    await User.findOneAndModify(_id, {contraseña: hashNewPassword});

    return res.status(200).json({message:mensajes.changesPass, code: 2});

    
};

app.use('/', validateToken, handler);

module.exports = { app, handler };
