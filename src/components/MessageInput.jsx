import { BsFillSendFill } from "react-icons/bs";

const MessageInput = ({ darkMode, handleSend, input, setInput }) => {
  return (
    <>
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
          required
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
    </>
  );
};

export default MessageInput;
