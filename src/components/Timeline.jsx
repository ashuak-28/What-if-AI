import React, { useEffect, useState } from "react";
import "../App.css";

const Timeline = ({ events, onComplete }) => {

  const [visibleIndex, setVisibleIndex] = useState(0);
  const [typedTexts, setTypedTexts] = useState([]);
  
 

  useEffect(() => {
    if (!events || events.length === 0 || !events[visibleIndex]) return;
    if (events.length > 0 && typedTexts.length === 0) {
    setTypedTexts(Array(events.length).fill(""));
  }

    let charIndex = 0;
    const fullText = events[visibleIndex].text;
    let currentTyped = "";

    const interval = setInterval(() => {
      currentTyped += fullText.charAt(charIndex);
      setTypedTexts(prev => {
        const newTexts = [...prev];
        newTexts[visibleIndex] = currentTyped;
        return newTexts;
      });

      charIndex++;

      if (charIndex >= fullText.length) {
  clearInterval(interval);

  // Proceed to next event after delay
  setTimeout(() => {
    if (visibleIndex < events.length - 1) {
      setVisibleIndex(prev => prev + 1);
    } else if (visibleIndex === events.length - 1 && onComplete) {
      onComplete(); // ✅ call this only when last event completes
    }
  }, 800);
}

    }, 20);

    return () => clearInterval(interval);
  }, [visibleIndex, events]);

  return (
    <div className="timeline-container">
      {events.slice(0, visibleIndex + 1).map((event, index) => (
        <div key={index} className="timeline-item">
          <div className="timeline-circle">
            <span className="timeline-year">{event.year}</span>
          </div>
          <div className="timeline-text">
            {typedTexts[index] || ""}
          </div>
          {index !== events.length - 1 && <div className="timeline-line" />}
        </div>
      ))}
    </div>
  );
};

export default Timeline;
