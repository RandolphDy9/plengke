"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Megaphone, X, ArrowRight } from "lucide-react";

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
      "Join us every weekend this July for live music, special Filipino summer dishes, and family-friendly fun. Bring the whole barkada! Expect traditional dancing, karaoke contests, and the best street food in town.",
    image: "/images/hero-image.jpg",
    alt: "Summer Fiesta at P'Lengke",
    buttonText: "Learn More",
    buttonLink: "https://www.facebook.com/PlengkeMTL",
  },
  {
    title: "Halo-Halo Season is Back",
    badge: "Seasonal Special",
    description:
      "Beat the Montreal heat with our classic Halo-Halo — loaded with ube, leche flan, sago, and more. Available while supplies last! We use only the finest ingredients to ensure a refreshing experience.",
    image: "/images/hero-image.jpg",
    alt: "Halo-Halo Seasonal Special",
  },
  {
    title: "Fresh Bibingka Now In Stock",
    badge: "Product Alert",
    description:
      "Your favorite kakanin is back on the shelves. Grab yours before they sell out — freshly made every morning! The perfect balance of sweet and savory catering to your Filipino cravings.",
    image: "/images/hero-image.jpg",
    alt: "Bibingka Product Alert",
  },
];

export default function Announcements({ items, title, subtitle }: AnnouncementsProps) {
  const displayItems = items && items.length > 0 ? items : DEFAULT_ANNOUNCEMENTS;
  const [selectedItem, setSelectedItem] = useState<AnnouncementItem | null>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedItem]);

  return (
    <section id="announcements" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="animate-on-scroll flex items-center gap-3 mb-10">
          <div className="p-2 rounded-xl bg-primary/10">
            <Megaphone className="text-primary" size={28} />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-foreground uppercase tracking-tighter">
              {title || <>What&apos;s <span className="text-primary">Happening</span></>}
            </h2>
            <p className="text-foreground/60 text-sm mt-0.5 font-bold uppercase tracking-widest leading-none">{subtitle || "Events, promos, and seasonal finds"}</p>
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
              className="animate-on-scroll group relative rounded-none overflow-hidden shadow-xl bg-card border-2 border-secondary flex flex-col transform transition-all cursor-pointer"
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedItem(item)}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[16/9]">
                <motion.img
                  src={item.image}
                  alt={item.alt || item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white text-secondary px-6 py-3 font-black uppercase text-xs tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform shadow-2xl">
                    View Details
                  </span>
                </div>
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
              <div className="p-8 flex flex-col gap-3 flex-1 border-t-2 border-secondary/10">
                <h3 className="text-2xl font-black text-foreground leading-none uppercase tracking-tighter group-hover:text-primary transition-colors">{item.title}</h3>
                {item.description && (
                  <p className="text-xs font-bold text-foreground/70 uppercase tracking-widest leading-tight line-clamp-2 flex-1">{item.description}</p>
                )}
                <div className="mt-4 flex items-center gap-2 text-primary font-black uppercase text-xs tracking-[0.2em]">
                  Read More <ArrowRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Announcement Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white border-[8px] border-secondary shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 bg-primary text-white p-2 hover:rotate-90 transition-transform active:scale-90"
              >
                <X size={32} strokeWidth={3} />
              </button>

              <div className="w-full md:w-1/2 relative bg-secondary/5 flex items-center justify-center overflow-hidden">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.alt || selectedItem.title} 
                  className="w-full h-full object-contain"
                />
                {selectedItem.badge && (
                  <div className="absolute top-8 left-0 bg-primary text-white font-black text-xl px-8 py-4 skew-x-[-12deg] -translate-x-2 shadow-2xl">
                    {selectedItem.badge}
                  </div>
                )}
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#FDFDFD]">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tighter leading-none italic">
                      {selectedItem.title}
                    </h2>
                    <div className="w-20 h-2 bg-primary" />
                  </div>
                  
                  <p className="text-lg text-foreground/80 font-bold uppercase tracking-widest leading-relaxed">
                    {selectedItem.description}
                  </p>

                  {(selectedItem.buttonText && selectedItem.buttonLink) ? (
                    <a
                      href={selectedItem.buttonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex items-center justify-center gap-2 px-10 py-5 bg-primary text-white font-black uppercase tracking-[0.2em] self-stretch md:self-start overflow-hidden transition-all"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {selectedItem.buttonText} <ArrowRight size={20} strokeWidth={3} />
                      </span>
                      <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </a>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

