import { ToastContainer } from "react-toastify";
import ChatWindow from "./components/ChatWindow";
import { TbMessageChatbotFilled } from "react-icons/tb";

function App() {
  return (
    <div className="min-h-screen bg-gray-800">
      <h1 className="text-2xl font-bold text-center flex items-center justify-center gap-2 p-4 text-white">
        BeyondChats AIBot <TbMessageChatbotFilled />
      </h1>
      <ChatWindow />
      <ToastContainer />
    </div>
  );
}

export default App;
