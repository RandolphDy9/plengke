"use client";

import { motion } from "framer-motion";
import { Megaphone } from "lucide-react";

interface AnnouncementItem {
  title: string;
  badge?: string;
  description?: string;
  image: string;
  alt?: string;
  buttonText?: string;
  buttonLink?: string;
}

interface AnnouncementsProps {
  items?: AnnouncementItem[];
  title?: string;
  subtitle?: string;
}

const badgeColors: Record<string, string> = {
  "Event": "bg-[#023341] text-white",
  "Seasonal Special": "bg-[#fd5e02] text-white",
  "Product Alert": "bg-yellow-500 text-[#023341]",
  "New Arrival": "bg-green-600 text-white",
  "Promo": "bg-pink-500 text-white",
};

const DEFAULT_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    title: "Summer Fiesta is Here!",
    badge: "Event",
    description:
      "Join us every weekend this July for live music, special Filipino summer dishes, and family-friendly fun. Bring the whole barkada!",
    image: "/images/hero-image.jpg",
    alt: "Summer Fiesta at P'Lengke",
    buttonText: "Learn More",
    buttonLink: "https://www.facebook.com/PlengkeMTL",
  },
  {
    title: "Halo-Halo Season is Back",
    badge: "Seasonal Special",
    description:
      "Beat the Montreal heat with our classic Halo-Halo — loaded with ube, leche flan, sago, and more. Available while supplies last!",
    image: "/images/hero-image.jpg",
    alt: "Halo-Halo Seasonal Special",
  },
  {
    title: "Fresh Bibingka Now In Stock",
    badge: "Product Alert",
    description:
      "Your favorite kakanin is back on the shelves. Grab yours before they sell out — freshly made every morning!",
    image: "/images/hero-image.jpg",
    alt: "Bibingka Product Alert",
  },
];

export default function Announcements({ items, title, subtitle }: AnnouncementsProps) {
  const displayItems = items && items.length > 0 ? items : DEFAULT_ANNOUNCEMENTS;

  return (
    <section id="announcements" className="py-16 md:py-24 bg-[#fcf5e3]">
      <div className="container mx-auto px-6">
        <div className="animate-on-scroll flex items-center gap-3 mb-10">
          <div className="p-2 rounded-xl bg-[#fd5e02]/10">
            <Megaphone className="text-[#fd5e02]" size={28} />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-[#023341]">
              {title || <>What&apos;s <span className="text-[#fd5e02]">Happening</span></>}
            </h2>
            <p className="text-[#023341]/60 text-sm mt-0.5">{subtitle || "Events, promos, and seasonal finds"}</p>
          </div>
        </div>

        <div
          className={`grid gap-6 ${
            displayItems.length === 1
              ? "grid-cols-1 max-w-2xl mx-auto"
              : displayItems.length === 2
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {displayItems.map((item, i) => (
            <motion.div
              key={i}
              className="animate-on-scroll group relative rounded-3xl overflow-hidden shadow-lg bg-white border border-[#fd5e02]/10 flex flex-col"
              whileHover={{ y: -6, boxShadow: "0 24px 48px -12px rgba(253,94,2,0.2)" }}
              transition={{ duration: 0.3 }}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[16/9]">
                <motion.img
                  src={item.image}
                  alt={item.alt || item.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
                {item.badge && (
                  <span
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow ${
                      badgeColors[item.badge] ?? "bg-[#fd5e02] text-white"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-2 flex-1">
                <h3 className="text-lg font-black text-[#023341] leading-snug">{item.title}</h3>
                {item.description && (
                  <p className="text-sm text-[#023341]/70 leading-relaxed flex-1">{item.description}</p>
                )}
                {item.buttonText && item.buttonLink && (
                  <a
                    href={item.buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#fd5e02] text-white font-bold text-sm self-start hover:bg-[#e65500] transition-colors"
                  >
                    {item.buttonText}
                    <span>→</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
