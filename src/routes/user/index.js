const nameModule = 'user/';

const { app: register } = require('./src/register');
const { app: confirmRegister } = require('./src/confirmRegister.');

module.exports = define => {
	define(nameModule + 'register', register);
	define(nameModule + 'confirmRegister', confirmRegister);
};
