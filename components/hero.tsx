"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Star } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import type { Image } from "sanity";

interface FloatingCard {
  emoji?: string;
  label?: string;
  title?: string;
}

interface HeroProps {
  badge?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  address?: string;
  statusText?: string;
  heroImage?: Image;
  floatingCard?: FloatingCard;
}

const Hero: React.FC<HeroProps> = ({
  badge = "EST. 2024",
  titlePrefix = "THE SOUL",
  titleHighlight = "PALENGKE!",
  description = "PREMIUM LOCAL HARVESTS REIMAGINED FOR THE MODERN FILIPINO TABLE. DIRECT FROM THE SOIL OF LUZON TO YOUR KITCHEN.",
  primaryButtonText = "SHOP THE HARVEST",
  primaryButtonLink = "#menu",
  secondaryButtonText = "OUR STORY",
  secondaryButtonLink = "https://www.facebook.com/PlengkeMTL",
  heroImage,
  floatingCard,
}) => {
  const heroImageUrl = heroImage
    ? urlFor(heroImage).width(1200).height(800).url()
    : "/images/hero-image.jpg";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-44 pb-16 overflow-hidden bg-accent"
    >
      {/* Background Sunburst Decor */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-[140%] h-[140%] opacity-[0.08] fill-primary animate-[spin_180s_linear_infinite]">
          {/* Central Hub */}
          <circle cx="50" cy="50" r="14" />
          {/* Main 8 Rays */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <g key={`main-${angle}`} transform={`rotate(${angle} 50 50)`}>
              <path d="M50 5 L56 35 L44 35 Z" />
              <path d="M50 10 L53 30 L47 30 Z" opacity="0.6" />
            </g>
          ))}
          {/* Secondary Mini Rays */}
          {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => (
            <path key={`sub-${angle}`} d="M50 20 L53 40 L47 40 Z" transform={`rotate(${angle} 50 50)`} opacity="0.4" />
          ))}
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Skewed Badge */}
            <div className="inline-block bg-secondary px-4 py-1 skew-x-[-15deg] shadow-lg">
              <span className="text-white font-black text-sm italic tracking-widest block skew-x-[15deg]">
                {badge}
              </span>
            </div>

            {/* Three-Line Title */}
            <div className="flex flex-col gap-0 leading-[0.85] select-none">
              <div className="text-4xl md:text-8xl font-black text-primary tracking-tighter">
                {titlePrefix ? titlePrefix : "THE SOUL"}
              </div>
              <div className="text-4xl md:text-8xl font-black text-primary tracking-tighter">
                {titleHighlight || "PALENGKE"}
              </div>
            </div>

            {/* Description */}
            <p className="max-w-xl text-lg md:text-xl font-black text-foreground/80 tracking-tight leading-tight">
              {description}
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Primary Button */}
            <div className="relative group">
              <div className="absolute inset-0 bg-secondary translate-x-2 translate-y-2 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
              <a
                href={primaryButtonLink}
                className="relative block px-10 py-5 bg-primary text-white font-black text-xl tracking-widest border-2 border-primary active:translate-x-1 active:translate-y-1 transition-transform"
              >
                {primaryButtonText}
              </a>
            </div>

            {/* Secondary Button */}
            <div className="relative group">
              <div className="absolute inset-0 bg-primary translate-x-2 translate-y-2 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
              <a
                href={secondaryButtonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block px-10 py-5 bg-secondary text-white font-black text-xl tracking-widest border-2 border-secondary active:translate-x-1 active:translate-y-1 transition-transform"
              >
                {secondaryButtonText}
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Content - Hero Image */}
        <div className="relative lg:mt-0 mt-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            {/* The Image Wrapper with Blue Border */}
            <div className="relative z-10 border-[16px] border-secondary shadow-2xl overflow-hidden aspect-[3/2]">
              <img
                src={heroImageUrl}
                alt="P'lengke Fresh Harvest"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Card - Bottom Right (Square Floating) */}
            {floatingCard && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: 1,
                  y: [0, 15, 0],
                  rotate: [2, -2, 2]
                }}
                transition={{
                  opacity: { duration: 0.8 },
                  y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute -bottom-6 -right-6 md:-bottom-16 md:-right-16 z-20 bg-white border-[4px] border-primary w-32 h-32 md:w-44 md:h-44 shadow-[0_20px_50px_rgba(0,0,0,0.3)] skew-x-[8deg] flex items-center justify-center p-4"
              >
                <div className="flex flex-col items-center text-center gap-2 skew-x-[-8deg]">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-3xl md:text-4xl shadow-inner">
                    {floatingCard.emoji || "✨"}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] md:text-xs font-black tracking-[0.2em] text-secondary leading-none mb-1">{floatingCard.label || "Must Try"}</span>
                    <span className="text-sm md:text-xl font-black text-primary leading-none italic">{floatingCard.title || "Bestseller"}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Decorative Spark behind image */}
            <div className="absolute -top-10 -right-10 w-full h-full bg-primary/20 blur-3xl -z-10 animate-pulse" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
