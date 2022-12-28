const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
// const http = require("http");
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);
// const io = require("socket.io")(3000, {
//   cors: { origin: "*" },
// });

const authRoute = require("./routes/auth");
const textsRoute = require("./routes/texts");

app.use(
  bodyParser.json(),
  cors({
    origin: "*",
  })
);
app.use("/auth", authRoute);
app.use("/text", textsRoute);

// io.on("connection", (socket) => {
//   console.log("a user connected");

//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });

mongoose
  .connect(
    `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@127.0.0.1:27017/${process.env.DB_NAME}?authSource=${process.env.AUTH_SOURCE}`
  )
  .then(() => {
    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log(`Server is running at port:${port}`));
    console.log("Connected to mongoDB");
  })
  .catch((err) => {
    console.error("Oops! Could not connect to mongoDB Cluster\n", err);
  });
