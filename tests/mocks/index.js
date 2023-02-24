const http = require('http');

const res = Object.create(http.ServerResponse.prototype);

const mockResponse = () => {

	res.status = function status(code) {
		this.status = code;
		return this;
	};

	res.json = function json(object) {
		this.json = object;
		return this;
	};

	return res;
};

const mockRequest = (body = {}, params = {}, query = {}, jwt = {}) => ({ body, params, query, jwt });

module.exports = { mockResponse, mockRequest };
