import React, { useState, useEffect } from 'react';

const Typewriter = ({ text, speed = 100, pause = 1000 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(prev => prev + text[index]);
        setIndex(prev => prev + 1);
      }, speed);
      
      return () => clearTimeout(timeoutId);
    }
  }, [index, text, speed, pause]);

  return <div>{displayedText}</div>;
};

export default Typewriter;