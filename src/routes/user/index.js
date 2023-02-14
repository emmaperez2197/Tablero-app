const nameModule = 'user/';

const { app: register } = require('./src/register');

module.exports = define => {
	define(nameModule + 'register', register);

};
