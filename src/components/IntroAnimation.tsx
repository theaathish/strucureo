"use client";
import { useState, useEffect } from "react";

interface IntroProps {
  onFinish: () => void;
}

export default function IntroAnimation({ onFinish }: IntroProps) {
  const fullText = "Where Great Minds Connect";
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [fade, setFade] = useState(false);

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

  const handleFinish = () => {
    setFade(true);
    setTimeout(onFinish, 1000);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-1000 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(#fff 1px, transparent 1px), radial-gradient(#fff 1px, #fafafa 1px)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0,10px 10px",
      }}
    >
      <h1 className="text-4xl font-bold mb-8">
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
