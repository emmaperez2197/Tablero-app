require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./src/routes');

const app = express();

app.use(morgan('dev'));


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.listen(process.env.PORT, () => {
	console.log('listening to port:', process.env.PORT);
});


routes(app);

module.exports = app;
