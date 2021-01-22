import express from 'express';
import bodyparser from 'body-parser';
const http = require('http');
const connectDb = require('./db');
const app = express();
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const path = require('path');
// const socket = io();
connectDb();

let interval: any;
// io connection to client
io.on('connection', (socket: any) => {
	if (interval) {
		clearInterval(interval);
	}
	interval = setInterval(() => getApiAndEmit(socket), 1000);
	socket.on('disconnect', () => {
		console.log('Client disconnected');
		clearInterval(interval);
	});
	console.log('New Ws connected');
});

///intialized middle ware
app.use(bodyparser.json());
const port = 5000;
//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/questions', require('./routes/api/questions'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/search', require('./routes/api/search'));

//serve static assets in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const getApiAndEmit = (socket: any) => {
	const response = new Date();
	// Emitting a new message. Will be consumed by the client
	socket.emit('FromAPI', response);
};

app.listen(process.env.PORT || port, () => {
	console.log(`Running in port in port ${port}`);
});
