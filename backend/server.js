const express = require('express');
const initializeDbImp       = require("./router/on-empty-db");
const socket       = require('socket.io');
const path = require('path');
const app = express();
const router       = require("./router/user-router");

app.use(express.static(path.join(__dirname, '../dist/hottake-db-web')));

let server = app.listen('8020', function (){
  console.log("[Server Initialized on Port 8020]")
})

let ioSocket = socket(server);
console.log("[Socket Initialized]")

ioSocket.on('connection', (socket) => {
  console.log(`Neue Socket-Verbindung: ${socket.id}`);
  // exportiert den socket um diesen in der router.js zu verwenden
  module.exports.ioSocket = ioSocket;

  // gibt aus wenn eine Socket Verbindung aufgehoben/getrennt wurde
  socket.on('disconnect', () => {
    console.log(`Socket-Verbindung getrennt: ${socket.id}`);
  });
});

initializeDbImp.initDb()

app.use(router);




