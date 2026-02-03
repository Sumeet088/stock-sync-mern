import { useContext, useEffect, useState } from "react";
import socket from "../../services/socket";
import { UserContext } from "../../context/UserContext";
import ChatInput from "./ChatInput";

const ChatWindow = () => {
  const { username } = useContext(UserContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("chatMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("chatMessage");
  }, []);

  if (!username) return null;

  return (
    <section className="bg-gray-100 p-4 rounded">
      <h2 className="text-xl font-semibold mb-3">Live Chat</h2>

      <div className="bg-white h-64 overflow-y-auto p-3 border rounded mb-3">
        {messages.map((m, i) => (
          <div key={i}>
            <strong>{m.user}</strong>: {m.message}
          </div>
        ))}
      </div>

      <ChatInput />
    </section>
  );
};

export default ChatWindow;
