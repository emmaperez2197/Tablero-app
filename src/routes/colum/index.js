const nameModule = 'colum/';

const { app: create } = require('./src/create');

const { app: addTicket } = require('./src/addTicket');

module.exports = define => {
	define(nameModule + 'create/', create);
	define(nameModule + 'addTicket/' , addTicket);

};
