const nameModule = 'ticket/';

const { app: create } = require('./src/create');
const { app: get } = require('./src/get');

module.exports = define => {
	define(nameModule , create);
	define(nameModule + 'get' , get);

};
