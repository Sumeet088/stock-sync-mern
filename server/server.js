require("dotenv").config();
const http = require("http");
const socketIo = require("socket.io");

const connectDB = require("./config/db");
const app = require("./app");
const chatSocket = require("./sockets/chatSocket");

connectDB();

const server = http.createServer(app);

// ✅ Socket.IO config for dev + production
const io = socketIo(server, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? true // same-origin in production
        : "http://localhost:5173", // Vite dev server
    methods: ["GET", "POST"],
  },
});

chatSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
