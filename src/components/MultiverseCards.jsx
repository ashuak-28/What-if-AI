import React, { useState, useEffect } from 'react';
import './MultiverseCards.css';

const MultiverseCards = ({ scenarios }) => {
  const [expanded, setExpanded] = useState([false, false, false]);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleExpand = (index) => {
    setExpanded((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  return (
    <div className="multiverse-container">
      {scenarios.map((text, index) => (
        <div
          key={index}
          className={`multiverse-card ${animate ? 'animated-card' : ''}`}
          style={animate ? { animationDelay: `${index * 1.2}s` } : {}}
        >
          <h3>Universe {index + 1}</h3>
          <p>{expanded[index] ? text : text.split(' ').slice(0, 20).join(' ') + '...'}</p>
          <button className="view-more-btn" onClick={() => toggleExpand(index)}>
            {expanded[index] ? 'View Less' : 'View More'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default MultiverseCards;
