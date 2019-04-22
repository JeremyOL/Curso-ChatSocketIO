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

    socket.on('chat:message', (data) => {
        console.log({
            username: data['username'],
            message: data['message']
        });
        io.sockets.emit('chat:message', {
            username: data['username'],
            message: data['message']
        });
    });

    socket.on('chat:typing', (data) => {
        console.log({
            username: data['username']
        });
        socket.broadcast.emit('chat:typing', {
            username: data['username']
        })
    });

});
io.on('connect', () => {
    console.log('Connect');
});

module.exports = app;