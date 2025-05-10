
import { useEffect, useState, useRef } from 'react';

const MarqueeText = ({ text }: { text: string }) => {
  const [position, setPosition] = useState(0);
  const animationRef = useRef<number>();
  
  useEffect(() => {
    const animate = () => {
      setPosition((prev) => {
        // Reset position when text moves out of view
        if (prev < -100) {
          return 100;
        }
        return prev - 0.5; // Speed of scrolling
      });
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    // Clean up animation frame on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="overflow-hidden bg-gradient-to-r from-gold-light via-gold to-gold-dark py-2 text-white font-semibold">
      <div
        className="whitespace-nowrap will-change-transform"
        style={{
          transform: `translateX(${position}%)`,
        }}
      >
        {text} {text} {text}
      </div>
    </div>
  );
};

export default MarqueeText;
