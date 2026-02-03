import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import socket from "../../services/socket";

const AuthModal = () => {
  const { username, setUsername } = useContext(UserContext);
  const [input, setInput] = useState("");

  if (username) return null;

  const handleLogin = () => {
    if (!input.trim()) return;
    setUsername(input);
    socket.emit("setUsername", input);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 text-center">
        <h2 className="text-xl font-semibold mb-4">Welcome</h2>
        <input
          className="border w-full p-2 mb-4 rounded"
          placeholder="Enter your username"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
