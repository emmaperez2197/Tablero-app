const nameModule = 'user/';

const { app: get } = require('./src/get');

module.exports = define => {
	define(nameModule + 'get',get);

};
