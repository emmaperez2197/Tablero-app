const {Router} = require('express');

const UserModel = require('../../../models/User');
const Token = require('../../../../helpers/JwtToken.js');
const Bcrypt = require('../../../../helpers/bcrypt')
const validateSchema = require('../../../structures/user/confirmPassword')
const message = require('../../../messages/user/recoverPass')
const {messageForNonExistantEmail} = require('../../../messages/user/register')


const app = Router();

const handler = async (req, res)=>{

    const validateBody = await validateSchema(req.body);
    
    if (validateBody.error) {
        return res.status(400).json(validateBody)
    }
    try {
        const {nuevaContraseña }= req.body

        const decodeData = await Token.decode(req.params.token);

        const getUser = await UserModel.getOne({email: decodeData});

        const {_id} = getUser

        const id = _id.toString();

        if (!getUser) {
            return res.status(404).json({message:messageForNonExistantEmail()})
        }

        const hashNewPassword = await Bcrypt.hashUser(nuevaContraseña);

        await UserModel.findOneAndModify(id, {contraseña: hashNewPassword})
        
        res.status(200).json({message: message.recoverPassConfirmed, code: 2})
    } catch (error) {
        return res.status(500).json({error: error.toString()})
    }
}


app.use('/:token', handler)

module.exports = {app, handler}
