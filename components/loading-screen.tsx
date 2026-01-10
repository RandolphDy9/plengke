"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-linear-to-br from-[#023341] via-[#fd5e02] to-[#023341]">
      <div className="text-center">
        <div className="mb-8 animate-bounce">
          <div className="text-6xl font-bold text-white drop-shadow-lg">
            P&apos;LENGKE
          </div>
          <div className="text-xl text-white/90 mt-2">
            Pamilihang Bayan ng Montreal
          </div>
        </div>
        <div className="w-64 h-2 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
