const express = require("express");
const app = express();
const { Server } = require("socket.io");
const cors = require("cors");
const wildcard = require("socketio-wildcard")();
const { roomRouter } = require("./routes/room.routes");
const { joinRouter } = require("./routes/join.routes");

app.use(cors());
app.use(express.json());
app.use("/join", joinRouter);
app.use("/room", roomRouter);

require("dotenv").config();

const http = require("http");
const { connection } = require("./config/db");
const exp = require("constants");
let server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Welcome To Rocket Fire");
});
app.get("/favicon", (req, res) => {
  return;
});

const io = new Server(server, {
  cors: {
    origin: "https://localhost:3000/",
    methods: ["GET", "POST"],
  },
});
io.use(wildcard);

io.on("connection", (socket) => {
  let lastEventTime = 0;
  const THROTTLE_INTERVAL = 1000;

  console.log("User connected :" + socket.id);
  socket.on("send_message", (data) => {
    const now = Date.now();

    if (now - lastEventTime > THROTTLE_INTERVAL) {
      lastEventTime = now;
      socket.broadcast.emit("receive_message", data);
    } 
  });

  socket.on("score", (data) => {
    data.start = false;
    socket.broadcast.emit(data.rid, data);
  });

  socket.on("score1", (data) => {
    socket.broadcast.emit(data.rid, data);
  });

  socket.on("start", (data) => {
    const now = Date.now();
    socket.broadcast.emit(data.rid + "start", data);
  });
});

server.listen(8080, async () => {
  try {
    await connection;
    console.log("DB Connected successfully");
  } catch (error) {
    console.log("Somthing wen wrong :", error);
  }
  console.log("Server is running");
});
