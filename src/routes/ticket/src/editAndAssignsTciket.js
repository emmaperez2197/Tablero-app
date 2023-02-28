const { Router } = require('express');

const TicketModel = require('../../../models/Ticket');
const UserModel = require('../../../models/User');

const messages = require('../../../messages/ticket/create')
const {userNoFount} = require('../../../messages/user/register')
const { validateEditTicket } = require('../../../middlewares/validateData');
const { validateToken } = require('../../../middlewares/auth-user');

const app = Router();

const handler = async (req, res) => {

    try {

        const [ticket, user] = await Promise.all([
             await TicketModel.findById(req.params.id),
             await UserModel.findById(req.body.assigned)
        ])


    if (!ticket) {
        return res.status(400).json({message: messages.ticketNoFount, code: 1})
    }

    if (!user) {
        return res.status(400).json({message: userNoFount(), code: 1})
    }


    if(ticket.assigned !== null){
        return res.status(400).json({messages: messages.ticketAlreadyAssigned, code: 1})
    }

    const id = ticket._id.toString();

    await TicketModel.findOneAndModify(id, {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        assigned: TicketModel.parseId(req.body.assigned)
    })


    return res.status(200).json({messages: messages.ticketEdit, code: 2})

    } catch (error) {
        return res.status(500).json({error: error.toString()});

    }

};

app.put('/:id',validateToken, validateEditTicket, handler);

module.exports = {app, handler}