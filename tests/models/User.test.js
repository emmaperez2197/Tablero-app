const assert = require('assert'); // para comparar
const ProductModel = require('../../src/models/User');

const compareData = (model, data) => {
	assert.deepStrictEqual(model.nombre, data.nombre);
	assert.deepStrictEqual(model.apellido, data.apellido);
	assert.deepStrictEqual(model.email, data.email);
	assert.deepStrictEqual(model.contraseña, data.contraseña);

};


const compareDataRequired = (model, data) => {

	assert.deepStrictEqual(model.nombre, data.nombre);
	assert.deepStrictEqual(model.apellido, data.apellido);
	assert.deepStrictEqual(model.email, data.email);
	assert.deepStrictEqual(model.contraseña, data.contraseña);
};

describe('Test Product Model', () => {

	const data = {
		nombre: 'emma',
		apellido: 'perez',
		email: 'juanperez@gmail.com',
		contraseña: '123456789',

	};


	it('Create Example Model', async () => {

		const productModel = new ProductModel(data);

		compareData(productModel, data);
	});

	it('should return "user" when the static collection function is executed', () => {

		const { collection } = ProductModel;
		assert.deepStrictEqual(collection, 'users');
	});

	it('Should return "product" when execute the collection instantiated function', () => {

		const collectionProduct = new ProductModel(data);
		assert.deepStrictEqual(collectionProduct.collection, 'users');
	});



	it('Should return a product object if everything was created ok', () => {

		const collectionRequired = new ProductModel(data);

		compareDataRequired(collectionRequired, data);
	});

});
