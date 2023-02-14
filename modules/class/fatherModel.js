const Mongodb = require('mongodb');

const Mongo = require('../database/Mongo');



const mongo = new Mongo();



module.exports = class Model {


    static get collection() {
		return 'default';
	}

	get collection() {
		return 'default';
	}

	static get statuses() {
		return {
			active: 'active',
			inactive: 'inactive'
		};
	}

}