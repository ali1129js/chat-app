/**
 * @Author: Ali
 * @Date:   2019-10-04T10:17:34+02:00
 * @Last modified by:   Ali
 * @Last modified time: 2019-10-04T11:00:43+02:00
 */
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("./router");
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);
//socket.io has .on methode where we manage a new socket connection and its disconnect
io.on("connection", socket => {
  const timestamp = Number(Date.now());
  const lDate = new Date(timestamp);
  console.log("we have a new connection!", lDate);
  socket.on("disconnect", () => {
    console.log("User has left");
  });
});
app.use(router);

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
