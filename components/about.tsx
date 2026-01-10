"use client";

import { useState, useEffect } from "react";
import { Users, Award, Heart, Clock, Store } from "lucide-react";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    {
      icon: Users,
      label: "Happy Customers",
      value: "10,000+",
      color: "from-[#fd5e02] to-[#e65500]",
    },
    {
      icon: Award,
      label: "Years in Business",
      value: "5+",
      color: "from-[#fcf5e3] to-[#fd5e02]",
    },
    {
      icon: Heart,
      label: "Authentic Recipes",
      value: "100+",
      color: "from-[#fd5e02] to-[#023341]",
    },
    {
      icon: Clock,
      label: "Hours Open Daily",
      value: "12",
      color: "from-[#034a5a] to-[#023341]",
    },
  ];

  return (
    <section
      id="about"
      className="py-20 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/people.jpg')",
      }}
    >
      {/* Gradient overlay matching your color scheme */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#023341] via-[#034a5a] to-[#023341] opacity-90" />

      {/* Animated pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(253,94,2,0.3),transparent_50%)] animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-6xl font-bold text-[#fcf5e3] mb-4 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10"
            }`}
          >
            About P&apos;lengke
          </h2>
          <p
            className={`text-xl text-[#fd5e02] mb-6 transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10"
            }`}
          >
            Ang Pamilihang Bayan ng Montreal
          </p>
          <div className="w-32 h-1.5 bg-gradient-to-r from-[#fd5e02] via-[#fcf5e3] to-[#fd5e02] mx-auto rounded-full animate-pulse" />
        </div> */}

        <div className="mb-16">
          <div
            className={`space-y-6 transition-all duration-1000 delay-300 max-w-3xl mx-auto ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#fd5e02]/20 backdrop-blur-sm border border-[#fd5e02]/30 rounded-full text-[#fcf5e3]">
                <Store size={20} />
                <span className="font-semibold">Restaurant & Grocery</span>
              </div>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-[#fcf5e3] leading-tight text-center">
              Your Neighborhood{" "}
              <span className="text-[#fd5e02]">Filipino Market</span>
            </h3>

            <p className="text-lg text-[#fcf5e3]/90 leading-relaxed text-center">
              P&apos;lengke brings the warmth and flavors of the Philippines to
              Montreal. We&apos;re more than just a restaurant and grocery store
              – we&apos;re a community hub where Filipino culture thrives.
            </p>

            <p className="text-lg text-[#fcf5e3]/90 leading-relaxed text-center">
              From traditional dishes like Bulalo and Kare-Kare to fresh
              ingredients for your home cooking, we offer authentic Filipino
              products and meals made with love and tradition.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                style={{ animationDelay: `${index * 100}ms` }}
                className="group relative bg-[#fcf5e3]/10 backdrop-blur-lg rounded-2xl p-6 text-center hover:bg-[#fcf5e3]/20 hover:scale-110 hover:-rotate-2 transition-all duration-500 border border-[#fcf5e3]/20 hover:shadow-2xl hover:shadow-[#fd5e02]/30"
              >
                <div
                  className={`inline-flex p-4 bg-gradient-to-br ${stat.color} rounded-2xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}
                >
                  <Icon className="text-white" size={32} />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-[#fcf5e3] mb-2 group-hover:text-[#fd5e02] transition-colors">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-[#fcf5e3]/80 font-semibold">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
