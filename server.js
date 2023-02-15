require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./src/routes');

const app = express();

app.use(cors());
app.use(morgan('dev'));


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.listen(process.env.PORT, () => {
	console.log('listening to port:', process.env.PORT);
});

const staticStr = path.join(__dirname, './src/public');
app.use('/', express.static(staticStr));

routes(app);

module.exports = app;
