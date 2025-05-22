import { useState } from "react";
import { Bouncy } from "ldrs/react";
import "ldrs/react/Bouncy.css";
import { sendMessageToBot } from "../api";
import { Copy, RefreshCw, Moon, Sun } from "lucide-react";
import { toast } from "react-toastify";
import { BsFillSendFill } from "react-icons/bs";

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
        <div
          className={`w-64 p-4 rounded-xl max-md:w-full max-sm:pt-0 ${
            darkMode ? "bg-gray-800" : "bg-slate-300"
          }`}
        >
          <h2 className="text-2xl max-sm:ml-8 font-bold mb-6 max-md:mb-2 max-md:text-center max-sm:mb-1 max-sm:text-xl">
            BeyondChats AI-BOT
          </h2>
          <ul className="md:space-y-2 max-sm:ml-8 text-lg max-md:flex max-md:space-x-2 max-md:items-center max-md:justify-center max-sm:text-sm max-sm:mb-2">
            <li className="cursor-pointer">Chat</li>
            <li className="opacity-60">Settings</li>
          </ul>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex mt-4 cursor-pointer items-center gap-2 px-3 py-1.5 rounded bg-purple-500 hover:scale-x-110 duration-200 max-sm:px-2 max-sm:py-1 transition-all hover:bg-purple-700 text-white max-md:-mt-12"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}{" "}
            <span className="max-md:hidden">
              {darkMode ? "Light" : "Dark"} Mode
            </span>
          </button>
        </div>

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
            {loading && (
              <div className="flex justify-start">
                <div className="animate-pulse">
                  <Bouncy
                    size="35"
                    speed="1.25"
                    color={`${darkMode ? "white" : "black"}`}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="flex items-center justify-center gap-4 p-2 max-md:gap-3 max-sm:gap-2"
          >
            <input
              type="text"
              className={`rounded-lg text-xl font-sans py-1.5 shadow-[1px_1px_8px] focus:outline-0 pl-2 w-full max-md:text-lg max-sm:text-sm ${
                darkMode ? "shadow-sky-300" : "shadow-sky-950"
              }`}
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="cursor-pointer hover:scale-110 duration-200 transition-all px-4 py-2 bg-purple-400 rounded-lg hover:bg-purple-600 hover:text-white font-semibold"
              type="submit"
            >
              <span className="max-md:hidden">Send</span>
              <BsFillSendFill className="md:hidden" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatWindow;
