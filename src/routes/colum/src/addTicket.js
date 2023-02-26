const { Router } = require('express');

const ColumModel = require('../../../models/Colum')
const TicketModel = require('../../../models/Ticket')

const messages = require('../../../messages/Colum/create');
const messagesTicket = require('../../../messages/ticket/create')

const {validateToken} = require('../../../middlewares/auth-user');

const {validateAddTicket} = require('../../../middlewares/validateData');

const app = Router();

const handler = async(req, res) => {

    try {
        
        const [newColum, ticket] = await Promise.all([
            ColumModel.findById(req.params.id),
            TicketModel.findById(req.body.id)
        ])
    
        if (!newColum) {
            return res.status(404).json({messages: messages.columNoFount, code: 1})
        }
    
        if (!ticket) {
            return res.status(404).json({messages: messagesTicket.ticketNoFount, code: 1})
        }

        const {_id} = ticket;
        
        const id = _id.toString();
        
        const idColum = newColum._id.toString();


        const currentColumn = await ColumModel.findById(ticket.idColum.toString())
    
        const columWithoutCurrentTicket = currentColumn.idTickets.filter((idTicket) => {
            idTicket !== id        
        });

        ColumModel.findOneAndModify(currentColumn._id, {idTickets:columWithoutCurrentTicket})
    
        const findIdTicket = newColum.idTickets.find(idTicket => idTicket === id);
 
        if (findIdTicket) {
            return res.status(400).json('El ticket ya esta asignado a esta columna')
        }
    
        newColum.idTickets.push(ColumModel.parseId(id))
    
        const [ getColumUpdated] = await Promise.all([
            ColumModel.findById(idColum),
            ColumModel.findOneAndModify(idColum, newColum),
            TicketModel.findOneAndModify(id, {idColum: ColumModel.parseId(idColum)})
        ]);
    
        return res.status(200).json({message: `Ticket asignado a la columna ${getColumUpdated.nombre}`})
    
    } catch (error) {
        return res.status(500).json({error: error.toString()});

    }

    
};

app.use('/:id',validateToken, validateAddTicket, handler);

module.exports = {app, handler}