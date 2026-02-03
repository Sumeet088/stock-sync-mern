const Chat = require("../models/Chat");

const chatSocket = (io) => {
  io.on("connection", (socket) => {
    let username = "";

    socket.on("setUsername", (name) => {
      username = name;
      console.log(`${username} connected`);
    });

    socket.on("chatMessage", async (data) => {
      const message = new Chat({
        user: username,
        message: data.message,
      });

      await message.save();
      io.emit("chatMessage", {
        user: username,
        message: data.message,
      });
    });

    socket.on("disconnect", () => {
      console.log(`${username || "User"} disconnected`);
    });
  });
};

module.exports = chatSocket;
