const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("PHONE CONNECTED");

  socket.on("camera-frame", (frame) => {
    socket.broadcast.emit("camera-frame", frame);
  });

  socket.on("disconnect", () => {
    console.log("PHONE DISCONNECTED");
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING ON 3001");
});