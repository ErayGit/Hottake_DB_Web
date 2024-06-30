const express = require("express");
const initializeDbImp = require("./router/on-empty-db");
const { Server } = require("socket.io");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const userRouter = require("./router/user-router");
const postRouter = require("./router/post-router");
const commentRouter = require("./router/comment-router");
const followRouter = require("./router/follow-router");
const fileRouter = require("./router/file-router");
const { seedDatabase } = require("./common/seed");
const cors = require("cors");

// CORS configuration
const corsOptions = {
  origin: "http://localhost:4200", // Allow requests from this origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../dist/hottake-db-web")));
app.use(cors(corsOptions));

let server = app.listen("8020", function () {
  console.log("[Server Initialized on Port 8020]");
});

const ioSocket = new Server(server, {
  cors: {
    origin: "http://localhost:4200", // Allow requests from this origin for WebSocket
    methods: ["GET", "POST"],
  },
});
console.log("[Socket Initialized]");

const userSocketMap = new Map();

ioSocket.on("connection", (socket) => {
  console.log(`Neue Socket-Verbindung: ${socket.id}`);

  const userId = socket.handshake.query.userId;
  userSocketMap.set(userId, socket.id);
  console.log(`User ${userId} is connected with socket id ${socket.id}`);

  module.exports.ioSocket = ioSocket;
  module.exports.userSocketMap = userSocketMap;
  // gibt aus wenn eine Socket Verbindung aufgehoben/getrennt wurde
  socket.on("disconnect", () => {
    console.log(`Socket-Verbindung getrennt: ${socket.id}`);
  });
});

initializeDbImp.initDb();
seedDatabase();

app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);
app.use(followRouter);
app.use(fileRouter);
