import { useState } from "react";
import { sendMessageToBot } from "../api";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import MessageInput from "./MessageInput";
import Loader from "./Loader";

const ChatWindow = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleSend = async (e, customMsg) => {
    e.preventDefault();
    const userInput = customMsg || input;
    if (!userInput.trim()) return;

    const userMsg = { sender: "user", text: userInput };
    setMessages([...messages, userMsg]);
    setInput("");
    setLoading(true);

    const botReply = await sendMessageToBot(input);
    const botMsg = { sender: "bot", text: botReply };
    setMessages((prev) => [...prev, botMsg]);
    setLoading(false);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const lastUserMessage = () => {
    const reversed = [...messages].reverse();
    return reversed.find((msg) => msg.sender === "user")?.text || "";
  };

  return (
    <>
      <div
        className={`${
          darkMode ? "bg-gray-900 text-white" : " bg-slate-200 text-slate-950"
        } rounded-xl p-2 mx-4 flex gap-2 max-md:gap-1 max-md:flex-col`}
      >
        {/* Sidebar */}
        <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Chat Section */}
        <div className="flex flex-1 gap-1 flex-col ">
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-slate-300"
            } rounded-xl h-[75vh] p-4 mx-2 overflow-y-auto`}
          >
            {messages.length === 0 && (
              <p
                className={`font-semibold text-center opacity-70 font-sans text-2xl`}
              >
                Your Messages Will Be Displayed Here...
              </p>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex my-2 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`relative max-w-[70%] p-2 rounded-lg shadow-[1px_1px_5px] ${
                    msg.sender === "user"
                      ? `${darkMode ? "shadow-sky-300" : "shadow-sky-950"}`
                      : `${
                          darkMode ? "shadow-fuchsia-300" : "shadow-fuchsia-950"
                        }`
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.sender === "bot" && (
                    <div className="flex justify-end mt-1 gap-2 text-sm text-gray-500">
                      <button
                        onClick={() => {
                          handleCopy(msg.text);
                          toast("Copied To Clipboard");
                        }}
                        title="Copy"
                        className="cursor-pointer hover:-translate-y-1 duration-150 transition-all"
                      >
                        <Copy size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          handleSend(e, lastUserMessage());
                          toast("Regenerating Response");
                        }}
                        title="Regenerate"
                        className="cursor-pointer hover:-translate-y-1 duration-150 transition-all"
                      >
                        <RefreshCw size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && <Loader darkMode={darkMode} />}
          </div>

          {/* Input */}
          <MessageInput
            darkMode={darkMode}
            handleSend={handleSend}
            input={input}
            setInput={setInput}
          />
        </div>
      </div>
    </>
  );
};

export default ChatWindow;
