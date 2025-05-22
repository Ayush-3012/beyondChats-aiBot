import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

export const sendMessageToBot = async (userMessage) => {
  try {
    const res = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          {
            role: "system",
            content: "Respond professionally with perfect grammar.",
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "X-Title": "BeyondChats-apiBot",
        },
      }
    );
    return res.data.choices[0].message.content;
  } catch (err) {
    console.error("API Error:", err.message);
    return "Sorry, something went wrong.";
  }
};
