const http = require('http');
const path = require('path');

const express = require('express');
const app = express();
const morgan = require('morgan');

const databaseConfig = require('./config/db');
const routes = require('./routes')
const port = process.env.PORT || 3030;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static("/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);

app.use('/api', routes())

server.listen(port);
server.on('listening', () => {
    console.log("server listening on port " + port);
    databaseConfig();
});
server.on('error', (error) => {
    console.log("An error occiurred in our server " + error);
});