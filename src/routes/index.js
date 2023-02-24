let app = null;
const user = require('./user');
const board = require('./board');
const ticket = require('./ticket');
const colum = require('./colum');

const defineRoute = (ruta, requests) => {
	const baseRequest = '/api/';
	const route = baseRequest + ruta;

	app.use(route, requests);
};

module.exports = aplication => {
	app = aplication;

	user(defineRoute);
	board(defineRoute);
	ticket(defineRoute);
	colum(defineRoute);
};
