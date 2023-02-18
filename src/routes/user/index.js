const nameModule = 'user/';

const { app: register } = require('./src/register');
const { app: confirmRegister } = require('./src/confirmRegister.');
const { app: login } = require('./src/login');
const { app: recoverPassword } = require('./src/recoverPassword');
const { app: confirmPassword } = require('./src/ConfirmPassword');

module.exports = define => {
	define(nameModule + 'register', register);
	define(nameModule + 'confirmRegister', confirmRegister);
	define(nameModule + 'login', login);
	define(nameModule + 'recoverPassword', recoverPassword);
	define(nameModule + 'confirmPassword', confirmPassword);

};
