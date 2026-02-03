import { io } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_SOCKET_URL
    : "http://localhost:5000";

const socket = io(SOCKET_URL, {
  transports: ["polling", "websocket"],
  withCredentials: true,
});

export default socket;
