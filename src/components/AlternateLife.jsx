import { useState } from "react";
import { motion } from "framer-motion";

const AlternateLife = () => {
  const [userInput, setUserInput] = useState("");
  const [story, setStory] = useState("");
  const [timeline, setTimeline] = useState([]);

  const fakeAIResponse = (decision) => {
    return {
      story: `What if you had chosen to ${decision}? Your life would have taken a thrilling turn! You’d be living in Tokyo, working as an AI engineer, and leading a double life as a futuristic detective by night.`,
      timeline: [
        { year: 2026, event: "Moved to Tokyo, joined AI startup" },
        { year: 2028, event: "Published first research paper on sentient bots" },
        { year: 2030, event: "Secretly solved major cyber crime" },
        { year: 2035, event: "Became known as 'The Quantum Ghost'" },
      ],
    };
  };

  const handleSubmit = () => {
    const { story, timeline } = fakeAIResponse(userInput);
    setStory(story);
    setTimeline(timeline);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6">🔮 What If...</h1>
      <input
        type="text"
        placeholder="Enter a decision (e.g., dropped out of college)"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className="w-full p-3 border rounded-xl mb-4"
      />
      <button
        onClick={handleSubmit}
        className="bg-indigo-500 text-white px-6 py-2 rounded-xl hover:bg-indigo-600 transition"
      >
        Generate Alternate Life
      </button>

      {story && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 bg-gray-100 p-4 rounded-xl shadow"
        >
          <p className="text-lg text-gray-800 mb-4">{story}</p>
          <ul className="space-y-2">
            {timeline.map((item, idx) => (
              <li key={idx} className="bg-white p-3 rounded-xl shadow-sm border-l-4 border-indigo-400">
                <strong>{item.year}:</strong> {item.event}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default AlternateLife;
