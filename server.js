const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const Db = require('./config/Db');
const app = express();
const server = http.createServer(app);
exports.io = new Server(server);
const io = new Server(server);

const Port = process.env.PORT;
const Router = require('./routes/routes');
const ErrorHandler = require('./middleware/ErrorHandler');

// Use cors as middleware
app.use(cors());
app.use(ErrorHandler);


// Parse requests of content-type - application/json
app.use(bodyParser.json()); // Use bodyParser as middleware

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Connect to the database
Db();

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Use the router for API routes
app.use('/api', Router);

server.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
