"use client";
import { useState, useEffect } from "react";

interface IntroProps {
  onFinish: () => void;
}

export default function IntroAnimation({ onFinish }: IntroProps) {
  const fullText = "Where Great Minds Connect";
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  // Typing effect: type one character every 100ms
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) => prev + fullText[index]);
      index++;
      if (index === fullText.length) {
        clearInterval(interval);
        setIsComplete(true);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [fullText]);

  // When user clicks, start fade/scroll animation
  const handleFinish = () => {
    setAnimateOut(true);
    setTimeout(onFinish, 1500);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-all duration-1000 
        ${animateOut ? "opacity-0 -translate-y-full" : "opacity-100 translate-y-0"}`}
    >
      <h1 className="text-4xl font-bold mb-8 transition-transform duration-1000">
        {displayText}
      </h1>
      {isComplete && (
        <button
          onClick={handleFinish}
          className="bg-green-500 hover:bg-green-600 transition-colors text-white font-semibold px-6 py-3 rounded"
        >
          Enter
        </button>
      )}
    </div>
  );
}
