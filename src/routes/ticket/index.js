const nameModule = 'ticket/';

const { app: create } = require('./src/create');
const { app: get } = require('./src/get');
const { app: editTicket } = require('./src/editAndAssignsTciket');

console.log('entre a las rutas');
module.exports = define => {
	define(nameModule , create);
	define(nameModule + 'get' , get);
	define(nameModule + 'editTicket' , editTicket);

};
