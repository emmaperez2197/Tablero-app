const { Router } = require('express');

const ColumModel = require('../../../models/Colum')
const TicketModel = require('../../../models/Ticket')

const validateSchema = require('../../../structures/validate-object-id');
const messages = require('../../../messages/Colum/create');
const messagesTicket = require('../../../messages/ticket/create')

const {validateToken} = require('../../../middlewares/auth-user');

const app = Router();

const handler = async(req, res) => {

    const validate = await validateSchema(req.params.id)

    if (validate.error) {
        return res.status(400).json(validate)
    }

    const validateBody = await validateSchema(req.body.id)

    if (validateBody.error) {
        return res.status(400).json(validate)
    }

    const [colum, ticket] = await Promise.all([
        ColumModel.findById(req.params.id),
        TicketModel.findById(req.body.id)
    ])

    if (!colum) {
        return res.status(404).json({messages: messages.columNoFount, code: 1})
    }

    if (!ticket) {
        return res.status(404).json({messages: messagesTicket.ticketNoFount, code: 1})
    }

    const {_id} = ticket

    const id = _id.toString();

    const findIdTicket = colum.idTickets.find(idTicket => idTicket === id);
    
    if (findIdTicket) {
        return res.status(400).json('El ticket ya esta asignado a esta columna')
    }

    colum.idTickets.push(id)

    const [ getColumUpdated] = await Promise.all([
        ColumModel.findById(colum._id.toString()),
        ColumModel.findOneAndModify(colum._id.toString(), colum),
        TicketModel.findOneAndModify(ticket._id.toString(), {idColum: id})
    ]);

    return res.status(200).json({message: `Ticket asignado a la columna ${getColumUpdated.nombre}`})

    
};

app.use('/:id',validateToken, handler);

module.exports = {app, handler}