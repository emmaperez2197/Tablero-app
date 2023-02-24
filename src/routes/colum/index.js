const nameModule = 'colum/';

const { app: create } = require('./src/create');

module.exports = define => {
	define(nameModule , create);

};
