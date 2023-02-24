let app = null;
const user = require('./user');
const board = require('./board');

const defineRoute = (ruta, requests) => {
	const baseRequest = '/api/';
	const route = baseRequest + ruta;

	app.use(route, requests);
};

module.exports = aplication => {
	app = aplication;

	user(defineRoute);
	board(defineRoute);
};
