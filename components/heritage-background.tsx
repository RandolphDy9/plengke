"use client";

import React from "react";

const HERITAGE_PATTERN = "/images/textures/filipino-heritage-pattern.png";
const FLAG_IMAGE = "/images/philippine-flag-draped.png";

interface HeritageBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export default function HeritageBackground({ children, className = "" }: HeritageBackgroundProps) {
  return (
    <section className={`relative pt-48 pb-24 min-h-screen bg-[#FBFAF7] overflow-hidden ${className}`}>
      {/* Filipino Heritage Background Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-80" 
        style={{ 
          backgroundImage: `url("${HERITAGE_PATTERN}")`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat'
        }}
      ></div>
      
      {/* Draped Philippine Flag Backdrop */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none opacity-20 z-0 select-none">
        <img 
          src={FLAG_IMAGE} 
          alt="" 
          className="w-full h-full object-contain object-top-left scale-150 -translate-x-12 -translate-y-12"
        />
      </div>

      {/* Decorative Accents */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-80 h-80 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}
