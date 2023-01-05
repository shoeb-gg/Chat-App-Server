const User = require("../schema/user");

let connectedUsers = [];

module.exports = (io, socket) => {
  //Sending Connection Confirmation to Client
  io.emit("connected", async () => {});

  //After A Client Disconnects
  socket.on("disconnect", async () => {
    connectedUsers = connectedUsers.filter((user) => {
      return user.socketId != socket.id;
    });

    updateToClients();
    console.log("After DC: " + connectedUsers.length);
  });

  //Receiving and Saving the Client Info after they connected
  socket.on("Client Cred", async (data) => {
    try {
      if (connectedUsers.find((e) => e.id === data.id)) {
        updateToClients();
        return;
      } else {
        User.findOne({ _id: data.id }, (err, user) => {
          connectedUsers.push(data);
          console.log("After Conn: " + connectedUsers.length);

          updateToClients();
        });
      }
    } catch (err) {
      console.log(err);
    }
  });

  //Update Clients regarding Connected Clients
  function updateToClients() {
    io.emit("online-users", connectedUsers);
  }
};
