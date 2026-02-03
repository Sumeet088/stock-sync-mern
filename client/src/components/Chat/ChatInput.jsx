import { useState } from "react";
import socket from "../../services/socket";

const ChatInput = () => {
  const [message, setMessage] = useState("");

  const send = () => {
    if (!message.trim()) return;
    socket.emit("chatMessage", { message });
    setMessage("");
  };

  return (
    <div className="flex gap-2">
      <input
        className="flex-1 border p-2 rounded"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
      />
      <button
        onClick={send}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
