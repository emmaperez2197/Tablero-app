const { Router } = require('express');

const TicketModel = require('../../../models/Ticket')

const messages = require('../../../messages/ticket/create')
const generateFilters = require('../../../middlewares/generate-filters');
const {ticket_data_complete} = require('../../../models/aggregates')
// const io = require('socket.io-client');
// const socket = io('http://localhost:7777');

const app = Router();

const handler = async(req, res) => {

    try {
        
        const tickets = await TicketModel.get(ticket_data_complete(req.filters));
        
        if (!tickets) {
            return res.status(404).json({messages: messages.ticketsNoExists, code: 1})
        }



        return res.status(200).json({messages: tickets})

    } catch (error) {
        return res.status(500).json({error: error.toString()});

    }

};

app.get('/', generateFilters, handler);

module.exports = {app, handler}