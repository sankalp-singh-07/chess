"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 5000 });
wss.on('connection', function (socket) {
    socket.on('error', console.error);
    socket.on('message', (data) => {
        console.log('Hello world data aa gya hai : %s', data);
    });
    socket.send('Connect ho gya hai');
});
