const {Router} = require('express');

const UserModel = require('../../../models/User');
const Token = require('../../../../helpers/JwtToken.js');
const Bcrypt = require('../../../../helpers/bcrypt');


const app = Router();

const handler = async (req, res)=>{
    console.log('hola');
    
}


app.use('/', handler)

module.exports = {app, handler}
