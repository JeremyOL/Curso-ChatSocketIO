const path = require('path');

const express = require('express');
const app = express();

const SocketIO = require('socket.io');

// CONFIGURACIONES
let SRV_PORT = 3000;
let STATIC_FILES = path.join(__dirname, 'public');

// CONFIGURACIONES - ARCHIVOS ESTATICOS
app.use(express.static(STATIC_FILES));

const server = app.listen(SRV_PORT, () => {
    console.log(`Inicializando servidor...`);
})
    .on('listening', () => {
        console.log(`Servidor escuchando en el puerto ${SRV_PORT}`);
    }).on('error', (err) => {
        console.error(`Ha ocurrido un error: ${err.message}`);
    }).on('connection', (socket) => {
        console.log(`CLIENT ADDRESS: ${socket.remoteAddress}`);
    });

//WEB SOCKETS
const io = SocketIO(server);

io.on('connection', (socket) => {
    console.log(`CLIENT ID: ${socket.id}`);
});
io.on('connect', () => {
    console.log('Connect');
});

module.exports = app;