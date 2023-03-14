const { Router } = require('express');

const TicketModel = require('../../../models/Ticket');
const UserModel = require('../../../models/User');
const ColumModel = require('../../../models/Colum');
const io = require('socket.io-client');
const socket = io('http://localhost:7777');

const messages = require('../../../messages/ticket/create')
const { validateTicket } = require('../../../middlewares/validateData');
const { validateToken } = require('../../../middlewares/auth-user');

const app = Router();

const handler = async (req, res) => {

    try {
        const {_id} = req.jwt

        const  [user, colum ] = await Promise.all([UserModel.findById(_id), ColumModel.findById(req.body.idColum)]) 

        if (!user) {
            return res.status(404).json({message: messages.informerNoexist, code:1 }) 
        }

        if (!colum) {
            return res.status(404).json({message: messages.informerNoexist, code:1 }) 
        }

        const createTicket = new TicketModel(req.body);

        const ticketCreated = await createTicket.create();

        colum.idTickets.push(ColumModel.parseId(ticketCreated.insertedId));

        await ColumModel.findOneAndModify(colum._id, colum);

        socket.emit('ticketAgregado', createTicket);


        return res.status(200).json({messages: messages.ticketCreated, code: 2});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.toString()});

    }

};

app.post('/',validateToken, validateTicket,  handler);

module.exports = {app, handler}