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
  "Event": "bg-secondary text-white",
  "Seasonal Special": "bg-primary text-white",
  "Product Alert": "bg-accent text-accent-foreground",
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
    <section id="announcements" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="animate-on-scroll flex items-center gap-3 mb-10">
          <div className="p-2 rounded-xl bg-primary/10">
            <Megaphone className="text-primary" size={28} />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              {title || <>What&apos;s <span className="text-primary">Happening</span></>}
            </h2>
            <p className="text-foreground/60 text-sm mt-0.5">{subtitle || "Events, promos, and seasonal finds"}</p>
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
              className="animate-on-scroll group relative rounded-none overflow-hidden shadow-xl bg-card border-2 border-secondary flex flex-col transform transition-all hover:-translate-y-2"
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
                    className={`absolute top-0 left-0 px-4 py-2 font-black uppercase tracking-tighter shadow-lg skew-x-[-15deg] translate-x-2 translate-y-2 z-10 ${
                      badgeColors[item.badge] ?? "bg-primary text-white"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col gap-3 flex-1">
                <h3 className="text-2xl font-black text-foreground leading-none uppercase tracking-tighter">{item.title}</h3>
                {item.description && (
                  <p className="text-sm font-bold text-foreground/70 uppercase tracking-widest leading-tight flex-1">{item.description}</p>
                )}
                {item.buttonText && item.buttonLink && (
                  <a
                    href={item.buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] self-stretch hover:bg-secondary transition-colors"
                  >
                    {item.buttonText}
                    <span className="text-xl">→</span>
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
