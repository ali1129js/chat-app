/**
 * @Author: Ali
 * @Date:   2019-10-04T10:17:34+02:00
 * @Last modified by:   Ali
 * @Last modified time: 2019-10-04T10:25:54+02:00
 */
const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
