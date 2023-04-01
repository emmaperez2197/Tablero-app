require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const routes = require('./src/routes');
const socket = require('./socketServer')
const socketIO = require('socket.io');
const app = express();



const corsOptions = {
	origin: '*', // Cambia '*' por el dominio del cliente en producción
	methods: ['GET', 'POST']
};
	

const server = http.createServer(app);
const io = socketIO(server);



app.use(cors(corsOptions));
app.use(morgan('dev'));


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

socket.socketConnection(io)

server.listen(process.env.PORT, () => {
	console.log('listening to port:', process.env.PORT);
});

const staticStr = path.join(__dirname, './src/public');
app.use('/', express.static(staticStr));

routes(app);

module.exports = app
