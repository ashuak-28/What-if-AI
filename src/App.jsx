// App.jsx
import React, { useState, useEffect, useRef } from "react";
import Timeline from "./components/Timeline";
import "./App.css";
import MultiverseCards from './components/MultiverseCards';



export default function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayedText, setDisplayedText] = useState("AI Says:");
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);
  const intervalRef = useRef(null);
  const [scenarios, setScenarios] = useState([]);
  const [showCards, setShowCards] = useState(false);
  const [showRevealButton, setShowRevealButton] = useState(false);




  useEffect(() => {
    let index = 0;
    let interval;

    if (response && !loading) {
      setDisplayedText("AI Says:");
      interval = setInterval(() => {
        setDisplayedText((prev) => prev + response.charAt(index));
        index++;
        if (index >= response.length) {
  clearInterval(interval);

}

        if (index >= response.length) {
          clearInterval(interval);
        }
      }, 30);
    }

    return () => clearInterval(interval);
  }, [response, loading]);
useEffect(() => {
  if (response) {
     console.log("Raw response:\n", response);
    let parts = response.split(/\n{2,}/).filter(p => p.trim() !== '');

    if (parts.length < 3) {
      const sentences = response.split(/(?<=[.?!])\s+/);
      const chunkSize = Math.ceil(sentences.length / 3);
      parts = [
        sentences.slice(0, chunkSize).join(' '),
        sentences.slice(chunkSize, 2 * chunkSize).join(' '),
        sentences.slice(2 * chunkSize).join(' ')
      ];
    }
console.log("SPLIT parts:", parts);
    setScenarios(parts.slice(0, 3));
  }
}, [response]);

  const handleSurprise = () => {
    const prompts = [
      "What if dinosaurs still existed?",
      "What if you woke up in the year 3025?",
      "What if you were a famous inventor?",
      "What if you had the ability to fly?",
      "What if the internet never existed?",
      "What if time travel was possible?",
      "What if AI ruled the world?",
      "What if you were born in the 1800s?",
      "What if the moon was your home?",
      "What if you had unlimited money?"
    ];

    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setPrompt(randomPrompt);
  };

  async function generateResponse() {
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse("");
    setDisplayedText("AI Says:");
    setEvents([]);

    const newEntry = {
      prompt,
      response: "",
      timestamp: new Date().toLocaleString(),
    };

    try {
      const res = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      const aiText = data.text || "";

      const lines = aiText.split("\n");
      const timelineEvents = [];
      const mainLines = [];

      for (const line of lines) {
        const trimmed = line.trim();
        if (/^\d+[\).\-]|\*\*.+\*\*/.test(trimmed)) {
          timelineEvents.push({ text: trimmed });
        } else if (trimmed !== "") {
          mainLines.push(trimmed);
        }
      }

      const finalResponse = mainLines.join("\n");
      setResponse(finalResponse);
      const parts = finalResponse.split(/\n{2,}/);
     

      newEntry.response = finalResponse;
      setHistory((prevHistory) => [newEntry, ...prevHistory]);

      if (timelineEvents.length === 0) {
        timelineEvents.push({ text: "No timeline events detected." });
      }
      setEvents(timelineEvents);

    } catch (error) {
      setResponse("Error fetching response");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-wrapper">
      <div className="animated-background"></div>

      {/* History Panel */}
      <div className={`history-panel ${showHistory ? "show" : ""}`}>
        <h2>🤖 What If History</h2>
        {history.length === 0 ? (
          <p>No past prompts yet.</p>
        ) : (
          history.map((item, index) => (
            <div key={index} className="history-entry">
             <div className="history-card">
  <div className="history-buttons-wrapper">
    <div className="history-buttons">
      <button
        className="regenerate-btn"
        onClick={(e) => {
          e.stopPropagation();
          setPrompt(item.prompt);
          generateResponse();
        }}
        title="Regenerate this prompt"
      >
        ✨
      </button>
      <button
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation();
          const updated = [...history];
          updated.splice(index, 1);
          setHistory(updated);
        }}
        title="Delete this entry"
      >
        ❌
      </button>
    </div>
  </div>
</div>



              <div
                className="history-content"
                onClick={() => {
                  setPrompt(item.prompt);
                  setResponse(item.response);
                  setDisplayedText("AI Says:");

                  let i = 0;
                  const interval = setInterval(() => {
                    setDisplayedText((prev) => prev + item.response.charAt(i));
                    i++;
                    if (i >= item.response.length) clearInterval(interval);
                  }, 30);

                  const lines = item.response.split("\n");
                  const timelineEvents = [];
                  for (const line of lines) {
                    const trimmed = line.trim();
                    if (/^\d+[\).\-]|\*\*.+\*\*/.test(trimmed)) {
                      timelineEvents.push({ text: trimmed });
                    }
                  }
                  setEvents(timelineEvents.length ? timelineEvents : [{ text: "No timeline events detected." }]);
                }}
              >
                <p><strong>Q:</strong> {item.prompt}</p>
                <p><strong>A:</strong> {item.response}</p>
                <p className="timestamp">{item.timestamp}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="app-container">
        <h1 className="app-heading">What If AI</h1>

        <textarea
          className="prompt-input"
          placeholder="Type your alternate reality prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={5}
        />

        <div className="button-bar">
          <div className="generate-button-wrapper">
            <button
  className={`generate-button ${loading ? "loading" : ""}`}
  onClick={generateResponse}
  disabled={loading}
>
  {loading ? (
    <>
      <span className="spinner" /> Generating...
    </>
  ) : (
    "Generate"
  )}
</button>

          </div>

          <div className="history-button-wrapper">
            <button
              className="history-toggle"
              onClick={() => setShowHistory(!showHistory)}
            >
              🕘
            </button>
          </div>

          <div className="surprise-button-wrapper">
            <button
              className="surprise-button"
              onClick={handleSurprise}
            >
              🎲 Surprise Me
            </button>
          </div>
        </div>

        <div className="response-box">
          <pre className="response-text">
            
  {loading ? (
    <>
      AI Says
      <span className="typing-dots">
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </span>
    </>
  ) : (
    displayedText || "Enter prompt and click Generate"
  )}
</pre>

        </div>
{response && !loading && (
  <button
    className="speak-button"
    onClick={() => {
      const utterance = new SpeechSynthesisUtterance(response);
      utterance.lang = "en-US";
      utterance.rate = 1;
      speechSynthesis.speak(utterance);
    }}
  >
    🔊 Hear Future You
  </button>
)}

        <Timeline events={events} onComplete={() => setShowRevealButton(true)} />
{showRevealButton && !showCards && (
  <button
    className="reveal-button"
    onClick={() => setShowCards(true)}
  >
    🔮 <span style={{ fontWeight: "bold", fontSize: "18px", letterSpacing: "1px" }}>Reveal Multiverse</span>

  </button>
)}

{scenarios.length > 0 && showCards && <MultiverseCards scenarios={scenarios} />}

      </div>
    </div>
  );
}
