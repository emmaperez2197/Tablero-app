const { Router } = require('express');


const app = Router();

const handler = async (req, res) => {

		res.json({message: 'Hola user'})
};

app.use('', handler);

module.exports = { app, handler };
