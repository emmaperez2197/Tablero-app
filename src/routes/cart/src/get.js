const { Router } = require('express');

const CartModel = require('../../../models/Cart');
const schemaId = require('../../../structures/validate-object-id');

const app = Router();

const handler = async (req, res) => {

	const validate = await schemaId(req.params.id);
	if(validate.error)
		return res.status(400).json(validate);

	try {
		const getCartByid = await CartModel.findById(req.params.id);

		if(!getCartByid)
			return res.status(404).json({ message: `there is no cart with the id: ${req.params.id}` });

		res.status(200).json(getCartByid);
	} catch(error) {
		return	res.status(500).json({ message: error.toString() });
	}
};

app.use('/:id', handler);

module.exports = { app, handler };
