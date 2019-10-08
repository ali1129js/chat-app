/**
 * @Author: Ali
 * @Date:   2019-10-04T10:17:34+02:00
 * @Last modified by:   Ali
 * @Last modified time: 2019-10-07T08:10:47+02:00
 */
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("./router");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
console.log();
const io = socketio(server);

//socket.io has .on methode where we manage a new socket connection and its disconnect
io.on("connection", socket => {
  const timestamp = Number(Date.now());
  const tson = new Date(timestamp);
  console.log("we have a new connection!", tson.toLocaleTimeString());

  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name}, has joined!` });
    socket.join(user.room);
    console.log(user.name, user.room);
    callback();
  });
  //User event
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });
    callback();
  });
  // disconnect event
  socket.on("disconnect", () => {
    const timestamp2 = Number(Date.now());
    const tsout = new Date(timestamp2);
    console.log("User has left", tsout.toLocaleTimeString());
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
