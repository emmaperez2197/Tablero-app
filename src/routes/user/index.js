const nameModule = 'user/';

const { app: register } = require('./src/register');
const { app: confirmRegister } = require('./src/confirmRegister.');
const { app: login } = require('./src/login');

module.exports = define => {
	define(nameModule + 'register', register);
	define(nameModule + 'confirmRegister', confirmRegister);
	define(nameModule + 'login', login);

};
