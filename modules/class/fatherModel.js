const Mongodb = require('mongodb');

const db = require('../database/MongoDB');


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

	async create() {

		try {
			return db.collection(this.collection).insertOne(this);
		} catch(error) {
			return error.message;
		}
	}

	static async findOneAndModify(id, data) {

		try {
			const idFormatted = new Mongodb.ObjectId(id)
			const getData = await db.collection(this.collection).findOneAndUpdate({ _id: idFormatted }, { $set: data });

			return getData;

		} catch(error) {
			return error.message;
		}
	}

	static async findById(id) {
		try {
			return db.collection(this.collection).findOne({ _id: Mongodb.ObjectId(id) });
		} catch(error) {
			return error.message;
		}
	}

	static async get(filters = {}, orderBy = {}) {
		try {

			return	db.collection(this.collection).find(filters).sort(orderBy).toArray();
		} catch(error) {
			return error.message;
		}
	}

	static async getOne(params = {}) {
		try {
			return db.collection(this.collection).findOne(params);
		} catch(error) {
			return error.message;
		}
	}
}