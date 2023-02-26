const validateSchemaTicket = require('../structures/ticket/create');
const validateSchemaColum = require('../structures/colum/create');
const validateSchemaId = require('../structures/validate-object-id');





const validateTicket = async (req, res, next) => {

	const validate = await validateSchemaTicket(req.body);

    if (validate.error) {
        return res.status(400).json(validate)
    }

    next();
};

const validateCreateColum = async (req, res, next) => {

    const validate = await validateSchemaColum(req.body);
    
    if (validate.error) {
        return res.status(400).json(validate)
    }
	
    next();
};


const validateAddTicket = async (req, res, next) => {

    const validate = await validateSchemaId(req.params.id)

    if (validate.error) {
        return res.status(400).json(validate)
    }
    
    const validateBody = await validateSchemaId(req.body.id)
    
    if (validateBody.error) {
        return res.status(400).json(validate)
    }
    
	
    next();
};



module.exports = {
	validateTicket,
    validateCreateColum,
    validateAddTicket
};
