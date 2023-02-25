const validateSchema = require('../structures/ticket/create');

const validateTicket = async (req, res, next) => {

	const validate = await validateSchema(req.body);

    if (validate.error) {
        return res.status(400).json(validate)
    }

    next();
};

module.exports = {
	validateTicket
};
