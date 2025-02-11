"use client";
import { useState, useEffect } from "react";

interface IntroAnimationProps {
  onFinish: () => void;
}

export default function IntroAnimation({ onFinish }: IntroAnimationProps) {
  const fullText = "Welcome to Strucureo";
  const [text, setText] = useState("");
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) {
        clearInterval(interval);
      }
    }, 100); // faster typing
    return () => clearInterval(interval);
  }, [fullText]);

  const handleArrowClick = () => {
    setFadeOut(true);
    setTimeout(() => onFinish(), 1000);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <h1
        className="text-4xl md:text-5xl font-bold mb-8 text-black"
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
        }}
      >
        {text}
      </h1>
      {text === fullText && (
        <button onClick={handleArrowClick} aria-label="Scroll Down" className="animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}
    </div>
  );
}
