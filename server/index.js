const express = require("express");
const cors = require("cors");

const app = express();

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
let tempSocket = null;
app.use(cors());

app.get("/", (req, res) => {
  res.send("running");
});

io.on("connection", (socket) => {
  tempSocket = socket;
  console.log("socket: ", socket.id);
  socket.emit("myId", socket.id);

  socket.on("callUser", ({ targetId, name, stream }) => {
    console.log("targetUser: ", targetId, stream);

    io.to(targetId).emit("callUser", { name, targetId, stream });
  });
});

server.listen(5500, () => console.log("running"));
