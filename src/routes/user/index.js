const nameModule = 'user/';

const { app: register } = require('./src/get');

module.exports = define => {
	define(nameModule + 'register', register);

};
