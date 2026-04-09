"use client";

import { useState, useEffect } from "react";
import { Users, Award, Heart, Clock, Store } from "lucide-react";

type Stat = { value: string; label: string };

type AboutData = {
  paragraph1?: string;
  paragraph2?: string;
  backgroundImageUrl?: string;
  stats?: Stat[];
};

const ICONS = [Users, Award, Heart, Clock, Store];
const COLORS = [
  "from-[var(--primary)] to-[#C62828]",
  "from-[var(--background)] to-[var(--primary)]",
  "from-[var(--primary)] to-[var(--foreground)]",
  "from-[var(--secondary)] to-[var(--foreground)]",
];

const defaultStats: Stat[] = [
  { value: "10,000+", label: "Happy Customers" },
  { value: "5+", label: "Years in Business" },
  { value: "100+", label: "Authentic Recipes" },
  { value: "12", label: "Hours Open Daily" },
];

const defaultParagraph1 =
  "P\u2019lengke brings the warmth and flavors of the Philippines to Montreal. We\u2019re more than just a restaurant and grocery store \u2013 we\u2019re a community hub where Filipino culture thrives.";

const defaultParagraph2 =
  "From traditional dishes like Bulalo and Kare-Kare to fresh ingredients for your home cooking, we offer authentic Filipino products and meals made with love and tradition.";

export default function About({ data }: { data?: AboutData }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const paragraph1 = data?.paragraph1 || defaultParagraph1;
  const paragraph2 = data?.paragraph2 || defaultParagraph2;
  const stats = data?.stats && data.stats.length > 0 ? data.stats : defaultStats;
  const bgImage = data?.backgroundImageUrl || "/images/people.jpg";

  return (
    <section
      id="about"
      className="py-20 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className="absolute inset-0 bg-linear-to-br from-[var(--foreground)] via-[var(--secondary)] to-[var(--foreground)] opacity-90" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(230,46,45,0.3),transparent_50%)] animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16">
          <div
            className={`space-y-6 transition-all duration-1000 delay-300 max-w-3xl mx-auto ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)]/20 backdrop-blur-sm border border-[var(--primary)]/30 rounded-full text-[var(--background)]">
                <Store size={20} />
                <span className="font-semibold">Restaurant &amp; Grocery</span>
              </div>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-[var(--background)] leading-tight text-center">
              Your Neighborhood{" "}
              <span className="text-[var(--primary)]">Filipino Market</span>
            </h3>

            <p className="text-lg text-[var(--background)]/90 leading-relaxed text-center">{paragraph1}</p>
            <p className="text-lg text-[var(--background)]/90 leading-relaxed text-center">{paragraph2}</p>
          </div>
        </div>

        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {stats.map((stat, index) => {
            const Icon = ICONS[index % ICONS.length];
            const color = COLORS[index % COLORS.length];
            return (
              <div
                key={stat.label}
                style={{ animationDelay: `${index * 100}ms` }}
                className="group relative bg-[var(--background)]/10 backdrop-blur-lg rounded-2xl p-6 text-center hover:bg-[var(--background)]/20 hover:scale-110 hover:-rotate-2 transition-all duration-500 border border-[var(--background)]/20 hover:shadow-2xl hover:shadow-[var(--primary)]/30"
              >
                <div
                  className={`inline-flex p-4 bg-linear-to-br ${color} rounded-2xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}
                >
                  <Icon className="text-white" size={32} />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-[var(--background)] mb-2 group-hover:text-[var(--primary)] transition-colors">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-[var(--background)]/80 font-semibold">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
