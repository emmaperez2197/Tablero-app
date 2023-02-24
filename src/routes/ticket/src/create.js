const { Router } = require('express');

const TicketModel = require('../../../models/Ticket')
const validateSchema = require('../../../structures/ticket/create')
const messages = require('../../../messages/ticket/create')
const {validateToken} = require('../../../middlewares/auth-user');

const app = Router();

const handler = async(req, res) => {

    const validate = await validateSchema(req.body);

    if (validate.error) {
        return res.status(400).json(validate)
    }

    try {
        
        const createTicket = new TicketModel(req.body)

        await createTicket.create()

        return res.status(200).json({messages: messages.ticketCreated, code: 2})

    } catch (error) {
        return res.status(500).json({error: error.toString()});

    }

};

app.use('/',validateToken, handler);

module.exports = {app, handler}