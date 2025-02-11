"use client";
import { useState } from "react";
import IntroAnimation from "./IntroAnimation";

interface WithIntroProps {
  children: React.ReactNode;
}

export default function WithIntro({ children }: WithIntroProps) {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <div className={`${showIntro ? "pointer-events-auto" : "pointer-events-none"}`}>
        {children}
      </div>
      {showIntro && (
        <div className="fixed inset-0 z-[1000]">
          <IntroAnimation onFinish={() => setShowIntro(false)} />
        </div>
      )}
    </>
  );
}
