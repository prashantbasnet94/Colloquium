"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var http = require('http');
var connectDb = require('./db');
var app = express_1.default();
var server = http.createServer(app);
var socketio = require('socket.io');
var io = socketio(server);
var path = require('path');
// const socket = io();
connectDb();
var interval;
// io connection to client
io.on('connection', function (socket) {
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(function () { return getApiAndEmit(socket); }, 1000);
    socket.on('disconnect', function () {
        console.log('Client disconnected');
        clearInterval(interval);
    });
    console.log('New Ws connected');
});
///intialized middle ware
app.use(body_parser_1.default.json());
var port = 5000;
//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/questions', require('./routes/api/questions'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/search', require('./routes/api/search'));
//serve static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static('client/build'));
    app.get('*', function (req, res) {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
var getApiAndEmit = function (socket) {
    var response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit('FromAPI', response);
};
app.listen(process.env.PORT || port, function () {
    console.log("Running in port in port " + port);
});
