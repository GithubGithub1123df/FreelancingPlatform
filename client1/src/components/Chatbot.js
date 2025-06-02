import axios from "axios";
import { useState } from "react";
const apiUrl = process.env.REACT_APP_API_URL;
const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post(`${apiUrl}/chatbot`, {
        message: input,
      });

      const botReply = res.data.reply;
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (err) {
      console.error("Error contacting server:", err.message);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error contacting server." },
      ]);
    }

    setInput("");
  };

  return (
    <div className="d-flex justify-content-center w-75  mx-auto vh-100 overflow-auto w-100">
      <div>
        <h1 className="text-center">Chatbot</h1>
        <div
          style={{ height: "350px", overflowY: "auto" }}
          className="h-75 m-2 border border-2 border-success rounded-3"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                textAlign: msg.sender === "user" ? "right" : "left",
                margin: "5px",
                padding: "8px",
                background: msg.sender === "user" ? "#0d6efd" : "#00FFFF",
                color: msg.sender === "user" ? "white" : "black",
                borderRadius: "10px",
              }}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="d-flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message"
            className="form-control mb-2 w-75"
          />
          <button onClick={sendMessage} className="btn btn-success m-2">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
