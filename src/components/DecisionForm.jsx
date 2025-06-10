import { useState } from "react";

export default function DecisionForm({ onSubmit }) {
  const [decision, setDecision] = useState("");
  const [alternate, setAlternate] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ decision, alternate, year });
    setDecision("");
    setAlternate("");
    setYear("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-2xl p-6 w-full max-w-lg mx-auto mt-10"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">What if you had...</h2>
      <input
        type="text"
        placeholder="E.g. chosen arts instead of science"
        className="w-full mb-3 p-2 border border-gray-300 rounded-xl"
        value={decision}
        onChange={(e) => setDecision(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="E.g. science stream"
        className="w-full mb-3 p-2 border border-gray-300 rounded-xl"
        value={alternate}
        onChange={(e) => setAlternate(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Year of the decision (e.g. 2018)"
        className="w-full mb-4 p-2 border border-gray-300 rounded-xl"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl w-full"
      >
        Simulate
      </button>
    </form>
  );
}
