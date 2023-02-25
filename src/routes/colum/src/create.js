const { Router } = require('express');

const ColumModel = require('../../../models/Colum')
const validateSchema = require('../../../structures/colum/create')
const messages = require('../../../messages/Colum/create')
const {validateToken} = require('../../../middlewares/auth-user');

const app = Router();

const handler = async(req, res) => {

    const validate = await validateSchema(req.body);

    if (validate.error) {
        return res.status(400).json(validate)
    }

    try {
        
        const createColum = new ColumModel(req.body);

        await createColum.create()

        return res.status(200).json({messages: messages.createColum(req.body.nombre), code: 2})

    } catch (error) {
        return res.status(500).json({error: error.toString()});

    }

};

app.use('/',validateToken, handler);

module.exports = {app, handler}