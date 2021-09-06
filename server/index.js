const cors = require("cors");
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const { validateUser, userEnabledPushNotifications } = require("./utils/Users");

const { success, error } = require("consola");
const { connect } = require("mongoose");
const passport = require("passport");

const { DB, PORT, CLIENT_URL } = require("./config");
const { createMessage, getMessagesForUser } = require("./utils/Messages");
const User = require("./models/User");
const { Expo } = require("expo-server-sdk");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: CLIENT_URL }); //TODO change the ip

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

require("./middlewares/passport")(passport);

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
const expo = new Expo();

io.use((socket, next) => {
  const user_id = socket.handshake.auth.user_id;
  if (!user_id) {
    return next(new Error("invalid user id"));
  } else {
    socket.user_id = user_id;
    next();
  }
});

const users = [];
const tickets = [];
io.on("connect", (socket) => {
  console.log(`new connection ${socket.id}`);
  users.push({
    socketId: socket.id,
    user_id: socket.user_id,
  });
  io.emit("users", users);

  getMessagesForUser(socket.user_id).then((messages) => {
    io.to(socket.id).emit("history", messages);
  });

  socket.on("message", (msg) => {
    msg.recipients.map((recipient) => {
      const recipientUserIndex = users.findIndex(
        (user) => user.user_id === recipient
      );
      const recipientUser = users[recipientUserIndex];
      if (recipientUser) {
        const recipientSocketId = recipientUser.socketId;
        createMessage(socket.user_id, recipient, msg.message).then(
          (value) => {
            socket.to(recipientSocketId).emit("message", value);
          },
          (reason) => console.log(reason)
        );
      } else if (validateUser(recipient)) {
        //User is valid but offline

        userEnabledPushNotifications(recipient).then(
          (pushNotificationsEnabled) => {
            if (pushNotificationsEnabled) {
              User.findById(recipient).then(({ pushToken }) => {
                try {
                  expo
                    .sendPushNotificationsAsync([
                      {
                        to: pushToken,
                        sound: "default",
                        body: msg.message,
                        data: { from: socket.user_id },
                      },
                    ])
                    .then((ticket) => {
                      tickets.push(ticket);
                    })
                    .then(() => {
                      createMessage(
                        socket.user_id,
                        recipient,
                        msg.message
                      ).then(
                        () => {},
                        (reason) => console.log(reason)
                      );
                    });
                } catch (error) {
                  console.error(error);
                }
              });
            } else {
              createMessage(socket.user_id, recipient, msg.message).then(
                () => {},
                (reason) => console.log(reason)
              );
            }
          }
        );
      }
    });
  });

  socket.on("disconnect", () => {
    console.log(`disconnected ${socket.id}`);
    const disconnectedUserIndex = users.findIndex(
      (user) => user.socketId === socket.id
    );
    users.splice(disconnectedUserIndex, 1);
    io.emit("users", users);
  });
});

const startApp = async () => {
  try {
    await connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    success({
      message: `Successfully connected to the database`,
      badge: true,
    });

    server.listen(PORT, () =>
      success({ message: `Server started on PORT ${PORT}`, badge: true })
    );
  } catch (err) {
    error({
      message: `Unable to connect with Database \n ${err}`,
      badge: true,
    });
    startApp();
  }
};

startApp();
