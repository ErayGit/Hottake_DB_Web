const express = require('express');
const initializeDbImp       = require("./router/on-empty-db");
const { Server}       = require('socket.io');
const path = require('path');
const bodyParser   = require('body-parser');
const app = express();
const userRouter       = require("./router/user-router");
const postRouter       = require("./router/post-router");
const commentRouter       = require("./router/comment-router");
const followRouter = require("./router/follow-router");
const fileRouter = require("./router/file-router");
const cors = require('cors');

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:4200', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, '../dist/hottake-db-web')));
app.use(cors(corsOptions));



let server = app.listen('8020', function (){
  console.log("[Server Initialized on Port 8020]")
})

const ioSocket = new Server(server, {
  cors: {
    origin: "http://localhost:4200", // Allow requests from this origin for WebSocket
    methods: ["GET", "POST"]
  }});
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

app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);
app.use(followRouter);
app.use(fileRouter);




