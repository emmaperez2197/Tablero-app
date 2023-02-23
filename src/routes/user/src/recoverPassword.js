const {Router} = require('express');

const UserModel = require('../../../models/User');
const Token = require('../../../../helpers/JwtToken.js');
const EmailService = require('../../../../services/EmailService');
const validateSchema = require('../../../structures/user/recoverPass')
const message = require('../../../messages/user/recoverPass')
const recoverPass = require('../../../../services/templates/recover-password')


const app = Router();

const handler = async (req, res)=>{

    const validateBody = await validateSchema(req.body);

    if (validateBody.error) {
        return res.status(400).json(validateBody)
    }
    try {
        const checkExistsEmail = await UserModel.get({email: req.body.email})

        if (!checkExistsEmail.length) {
            return res.status(200).json({message: message.userNotExist, code: 2})
        }

        const token = Token.sing(req.body.email);

       await EmailService.sendEmail(req.body.email, message.recoverPass,  recoverPass(token));


        return res.status(200).json({message: message.messageSendEmail(req.body.email), code: 2})


    } catch (error) {
        return res.status(500).json({error: error.toString()})
    }
}


app.use('/', handler)

module.exports = {app, handler}
