const { Router } = require('express');

const BoardModel = require('../../../models/Tablero')
const validateSchema = require('../../../structures/board/create')
const messages = require('../../../messages/tablero/create')
const {validateToken} = require('../../../../src/middlewares/auth-user');

const app = Router();

const handler = async(req, res) => {

    const validate = await validateSchema(req.body);

    if (validate.error) {
        return res.status(400).json(validate)
    }

    try {
        
        const getBoard = await BoardModel.getOne({nombre: req.body.nombre});
    
        if (getBoard) {
            return res.status(404).json({messages: messages.notableFound, code: 1})
        } 
        
        const createBoard = new BoardModel(req.body);
    
        await createBoard.create()
    
        return res.status(200).json({messages: message, code: 2});

    } catch (error) {
        return res.status(500).json({error: error.toString()});
    }
};

app.use('/',validateToken, handler);

module.exports = {app, handler}