import { Moon, Sun } from "lucide-react";

const Sidebar = ({ darkMode, setDarkMode }) => {
  return (
    <>
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
    </>
  );
};

export default Sidebar;
