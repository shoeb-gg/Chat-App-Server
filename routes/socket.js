const controller = require("../controllers/socket");

module.exports = (io, socket) => {
  socket.emit("connected", controller.connected);
  socket.on("disconnect", controller.disconnected);

  socket.emit("online-users", controller.sendConnectedUsers);
};
