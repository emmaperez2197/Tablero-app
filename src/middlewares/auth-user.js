const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {

	const token = req.header('Authorization');

	if(!token) {
		return res.status(401).json({msg: 'Debe loguearse para acceder a los datos de su cuenta.', code: 1});
	}
	try {
		const verify = jwt.verify(token, process.env.KEY_PRELOGIN);
		req.jwt = verify;
		next();

	} catch(error) {
		return res.status(500).json({msg: 'Hubo un error al validar su usuario, intente nuevamente.', code: -1 });
	}
};

module.exports = {
	validateToken
};
