const {Router} = require('express');

const UserModel = require('../../../models/User');
const Token = require('../../../../helpers/JwtToken.js');
const Bcrypt = require('../../../../helpers/bcrypt');
const validateSchema = require('../../../structures/user/recoverPass')


const app = Router();

const handler = async (req, res)=>{

    const validateBody = await validateSchema(req.body);

    if (validateBody.error) {
        return res.status(400).json(validateBody)
    }
    try {
        const checkExistsEmail = await UserModel.get({email: req.body.email})

        if (!checkExistsEmail.length) {
            
        }

    } catch (error) {
        return res.json(500).json({error: error.toString()})
    }
}


app.use('/', handler)

module.exports = {app, handler}
