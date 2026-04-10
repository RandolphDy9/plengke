"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import PageHeader from "./page-header";

type DessertItem = { 
  image: string; 
  alt: string;
  title: string;
  description?: string;
  badge?: string;
};

const badgeColors: Record<string, string> = {
  "Bestseller": "bg-secondary text-white",
  "Seasonal": "bg-primary text-white",
  "New": "bg-accent text-accent-foreground",
};

const defaultDesserts: DessertItem[] = [
  { 
    title: "Leche Flan",
    image: "/images/dessert-4.jpg", 
    alt: "Leche flan - creamy caramel custard",
    description: "The ultimate Filipino dessert. Our leche flan is ultra-creamy, velvety, and topped with a rich caramel syrup that melts in your mouth. Prepared using a traditional family recipe that ensures the perfect silky consistency every time.",
    badge: "Bestseller"
  },
  { 
    title: "Ube Royale Cake",
    image: "/images/dessert-2.jpg", 
    alt: "Ube cake - purple yam dessert",
    description: "A show-stopping purple yam sponge cake layered with creamy ube halaya frosting. Vibrant, light, and authentically Filipino. Each layer is infused with premium ube from the Philippines for that unmistakable earthy sweetness.",
    badge: "Seasonal"
  },
  { 
    title: "Mango Pie",
    image: "/images/dessert-3.jpg", 
    alt: "Mango or buko pie with golden custard filling",
    description: "Flaky, buttery crust filled with the sweetest tropical mangoes. A golden treat that captures the essence of summer in every bite. Perfectly balanced between the tartness of the fruit and the sweetness of our signature glaze."
  },
  { 
    title: "Fiesta Platter",
    image: "/images/dessert-1.jpg", 
    alt: "Assorted Filipino desserts platter",
    description: "Can't decide? Our Fiesta Platter features a curated selection of traditional kakanin, puto, and sweet delicacies for the whole family. It's a colorful celebration of Filipino sweetness, perfect for sharing special moments."
  },
];

type DessertsProps = {
  items?: DessertItem[];
  title?: string;
  subtitle?: string;
};

export default function Desserts({ items, title, subtitle }: DessertsProps) {
  const displayItems = items && items.length > 0 ? items : defaultDesserts;
  const [selectedDessert, setSelectedDessert] = useState<DessertItem | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedDessert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedDessert]);

  return (
    <section id="desserts" className="py-16 md:py-24 relative overflow-hidden bg-accent/30">
      {/* Decorative harvest texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16 text-center">
          <PageHeader
            title={title || "SUMMER DELIGHTS"}
            subtitle={subtitle || "TRADITIONAL FILIPINO DESSERTS TO COMPLETE YOUR SUMMER MEAL"}
          />
        </div>

        {/* Slider Navigation */}
        <div className="absolute top-[55%] left-0 right-0 z-10 flex justify-between px-4 pointer-events-none transform -translate-y-1/2">
          <button
            onClick={() => scroll("left")}
            className="pointer-events-auto bg-primary text-white p-4 md:p-5 shadow-2xl hover:scale-110 active:scale-95 transition-all skew-x-[-12deg] flex items-center justify-center border-2 border-white/20"
            aria-label="Previous dessert"
          >
            <ChevronLeft size={40} strokeWidth={4} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="pointer-events-auto bg-primary text-white p-4 md:p-5 shadow-2xl hover:scale-110 active:scale-95 transition-all skew-x-[-12deg] flex items-center justify-center border-2 border-white/20"
            aria-label="Next dessert"
          >
            <ChevronRight size={40} strokeWidth={4} />
          </button>
        </div>

        {/* Desserts Slider */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 pb-12 cursor-grab no-scrollbar snap-x snap-mandatory px-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayItems.map((dessert, i) => (
            <motion.div
              key={i}
              className="flex-shrink-0 w-[300px] md:w-[400px] snap-center flex flex-col"
            >
              <div
                onClick={() => setSelectedDessert(dessert)}
                className="animate-on-scroll group relative rounded-none overflow-hidden shadow-xl bg-card border-2 border-secondary flex flex-col transform transition-all cursor-pointer h-full"
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[16/9]">
                  <motion.img
                    src={dessert.image}
                    alt={dessert.alt || dessert.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-secondary px-6 py-3 font-black uppercase text-xs tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform shadow-2xl">
                      View Details
                    </span>
                  </div>
                  {dessert.badge && (
                    <span
                      className={`absolute top-0 left-0 px-4 py-2 font-black uppercase tracking-tighter shadow-lg skew-x-[-15deg] translate-x-2 translate-y-2 z-10 ${
                        badgeColors[dessert.badge] ?? "bg-primary text-white"
                      }`}
                    >
                      {dessert.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col gap-3 flex-1 border-t-2 border-secondary/10 bg-white">
                  <h3 className="text-2xl font-black text-foreground leading-none uppercase tracking-tighter group-hover:text-primary transition-colors">{dessert.title}</h3>
                  {dessert.description && (
                    <p className="text-xs font-bold text-foreground/70 uppercase tracking-widest leading-tight line-clamp-2 flex-1">{dessert.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dessert Detail Modal */}
      <AnimatePresence>
        {selectedDessert && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDessert(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white border-[8px] border-secondary shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedDessert(null)}
                className="absolute top-4 right-4 z-20 bg-primary text-white p-2 hover:rotate-90 transition-transform active:scale-90"
              >
                <X size={32} strokeWidth={3} />
              </button>

              <div className="w-full md:w-1/2 relative bg-secondary/5 flex items-center justify-center overflow-hidden">
                <img 
                  src={selectedDessert.image} 
                  alt={selectedDessert.alt || selectedDessert.title} 
                  className="w-full h-full object-contain"
                />
                {selectedDessert.badge && (
                  <div className="absolute top-8 left-0 bg-primary text-white font-black text-xl px-8 py-4 skew-x-[-12deg] -translate-x-2 shadow-2xl">
                    {selectedDessert.badge}
                  </div>
                )}
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#FDFDFD]">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tighter leading-none italic">
                      {selectedDessert.title}
                    </h2>
                    <div className="w-20 h-2 bg-primary" />
                  </div>
                  
                  <p className="text-lg text-foreground/80 font-bold uppercase tracking-widest leading-relaxed">
                    {selectedDessert.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}


