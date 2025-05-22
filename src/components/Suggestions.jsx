import { chatStarters } from "../utils/mockdata";

const Suggestions = ({ setInput, handleSend }) => {
  const getRandomSuggestions = () => {
    const allQuestions = [
      ...chatStarters.learning,
      ...chatStarters.curiosity,
      ...chatStarters.guidance,
    ];

    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const suggestions = getRandomSuggestions();

  return (
    <>
      <div className="flex flex-wrap my-1 gap-4 items-center justify-center">
        {suggestions?.map((item, index) => (
          <button
            key={index}
            className="rounded-lg cursor-pointer hover:-translate-y-1 duration-150 transition-all px-2 py-1 shadow-[1px_1px_5px] hover:shadow-[1px_1px_20px] shadow-emerald-600"
            onClick={(e) => {
              setInput(item);
              handleSend(e, item);
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </>
  );
};

export default Suggestions;
