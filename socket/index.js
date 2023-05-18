import { Server } from "socket.io";

const io = new Server({
  cors: "*",
});

let onlineUsers = [];

const addUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => onlineUsers.find((user) => user.username === username);

io.on("connection", (socket) => {
  socket.on("newUser", (username) => {
    console.log("newUser");
    addUser(username, socket.id);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });

  socket.on("sendNotification", ({ sender, receiver, type }) => {
    const recieverUser = getUser(receiver);
    if (recieverUser) {
      io.to(recieverUser.socketId).emit("getNotification", { sender, type });
    }
  });
});

io.listen(5000);
