
import { useEffect, useState } from 'react';

const MarqueeText = ({ text }: { text: string }) => {
  const [position, setPosition] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        // Reset position when text moves out of view
        if (prev < -100) {
          return 100;
        }
        return prev - 0.5; // Speed of scrolling
      });
    }, 30);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden bg-gradient-to-r from-gold-light via-gold to-gold-dark py-2 text-white font-semibold">
      <div
        className="whitespace-nowrap"
        style={{
          transform: `translateX(${position}%)`,
        }}
      >
        {text} {/* Add multiple instances to ensure continuous flow */}
        {text}
        {text}
      </div>
    </div>
  );
};

export default MarqueeText;
