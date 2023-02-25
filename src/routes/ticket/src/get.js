const { Router } = require('express');

const TicketModel = require('../../../models/Ticket')
const {validateToken} = require('../../../middlewares/auth-user');

const generateFilters = require('../../../middlewares/generate-filters');
const {ticket_data_complete} = require('../../../models/aggregates')

const app = Router();

const handler = async(req, res) => {

    try {
        
        const tickets = await TicketModel.get(ticket_data_complete(req.filters));
        res.json(tickets)

    } catch (error) {
        return res.status(500).json({error: error.toString()});

    }

};

app.get('/',validateToken, generateFilters, handler);

module.exports = {app, handler}