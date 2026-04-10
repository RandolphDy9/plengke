"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import PageHeader from "@/components/page-header";

type Special = { 
  title: string; 
  image: string; 
  alt: string;
  description?: string;
};

const defaultSpecials: Special[] = [
  { 
    title: "Tuesday Specials", 
    image: "/images/menu-2.jpg", 
    alt: "Tuesday menu featuring Menudo, Laing, Paksiw na Bangus, Kare-Kare, Binagoongan Sinigang, Chicken Curry, and Chicken Adobo",
    description: "Our Tuesday harvest feast! Enjoy a rich variety of stews including our famous Menudo and spice-packed Laing. Perfect for a mid-week pick-me-up."
  },
  { 
    title: "Wednesday Specials", 
    image: "/images/menu-3.jpg", 
    alt: "Wednesday menu featuring Pusit, Monggo, Sinaing na Tulingan, Igado, Bicol Express, Tinola, Ginataang, Kalabasa/Sitaw, and Pork Adobo",
    description: "Mid-week seafood and heartier fares. From savory Pusit to the creamy heat of Bicol Express, Wednesday is for true flavor explorers."
  },
  { 
    title: "Friday Specials", 
    image: "/images/menu-4.jpg", 
    alt: "Friday menu featuring Pusit, Monggo, Sinaing na Tulingan, Igado, Bicol Express, Tinola, Ginataang, Kalabasa/Sitaw, and Pork Adobo",
    description: "Launch your weekend with our Friday favorites. We bring out the heavy hitters including slow-cooked Adobo and fresh vegetable medleys."
  },
  { 
    title: "Weekend Feast", 
    image: "/images/menu-1.jpg", 
    alt: "Weekend specials",
    description: "Saturday and Sunday are for family. Our weekend feast includes extra-large servings of our most requested party platters."
  },
];

type MenuSpecialsProps = {
  specials?: Special[];
  title?: string;
  subtitle?: string;
};

export default function MenuSpecials({ specials, title, subtitle }: MenuSpecialsProps) {
  const items = specials && specials.length > 0 ? specials : defaultSpecials;
  const [selectedSpecial, setSelectedSpecial] = useState<Special | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedSpecial) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedSpecial]);

  return (
    <section id="specials" className="py-24 bg-accent relative overflow-hidden">
      {/* Decorative harvest texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16 text-center">
          <PageHeader
            title={title || "WEEKLY SPECIALS"}
            subtitle={subtitle || "FRESH DAILY DISHES AND SPECIAL OFFERINGS THROUGHOUT THE WEEK"}
          />
        </div>

        {/* Slider Navigation */}
        <div className="absolute top-[60%] md:top-[50%] left-0 right-0 z-10 flex justify-between px-4 pointer-events-none">
          <button
            onClick={() => scroll("left")}
            className="pointer-events-auto bg-primary text-white p-5 shadow-2xl hover:scale-110 active:scale-95 transition-all skew-x-[-12deg] flex items-center justify-center"
          >
            <ChevronLeft size={40} strokeWidth={4} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="pointer-events-auto bg-primary text-white p-5 shadow-2xl hover:scale-110 active:scale-95 transition-all skew-x-[-12deg] flex items-center justify-center"
          >
            <ChevronRight size={40} strokeWidth={4} />
          </button>
        </div>

        {/* Specials Slider */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 pb-12 cursor-grab no-scrollbar snap-x snap-mandatory px-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((special, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex-shrink-0 w-[300px] md:w-[450px] snap-center"
            >
              <div
                onClick={() => setSelectedSpecial(special)}
                className="animate-on-scroll bg-white rounded-none border-4 border-secondary overflow-hidden shadow-2xl hover:shadow-[0_45px_100px_rgba(52,92,178,0.3)] transition-all duration-500 hover:scale-[1.03] group cursor-pointer relative"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={special.image || "/placeholder.svg"}
                    alt={special.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-0 left-0 bg-primary text-white font-black px-6 py-3 uppercase tracking-tighter skew-x-[-12deg] -translate-x-2 shadow-lg">
                    Today&apos;s Pick
                  </div>
                  {/* View Details Overlay */}
                  <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-secondary px-6 py-3 font-black uppercase text-xs tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform">
                      Explore Daily Menu
                    </span>
                  </div>
                </div>
                <div className="p-8 text-center bg-white">
                  <h3 className="text-3xl font-black text-foreground uppercase tracking-tighter mb-1 group-hover:text-primary transition-colors italic leading-none">
                    {special.title}
                  </h3>
                  <div className="w-16 h-1 bg-primary mx-auto mt-4 group-hover:w-full transition-all duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Special Detail Modal */}
      <AnimatePresence>
        {selectedSpecial && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSpecial(null)}
              className="absolute inset-0 bg-secondary/80 backdrop-blur-md"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white border-[8px] border-secondary shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedSpecial(null)}
                className="absolute top-4 right-4 z-20 bg-primary text-white p-2 hover:rotate-90 transition-transform active:scale-90"
              >
                <X size={32} strokeWidth={3} />
              </button>

              {/* Image Section */}
              <div className="w-full md:w-1/2 relative bg-secondary/5 flex items-center justify-center overflow-hidden">
                <img 
                  src={selectedSpecial.image} 
                  alt={selectedSpecial.title} 
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-8 left-0 bg-primary text-white font-black text-2xl px-8 py-4 skew-x-[-12deg] -translate-x-2 shadow-2xl">
                  DAILY FRESH 🍲
                </div>
              </div>

              {/* Text Section */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className="space-y-6 text-center md:text-left">
                  <div className="space-y-2">
                    <span className="inline-block bg-accent px-4 py-1 text-black font-black uppercase text-xs tracking-widest skew-x-[-15deg]">
                      WEEKLY SPECIALS
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tighter leading-none italic">
                      {selectedSpecial.title}
                    </h2>
                  </div>
                  
                  <div className="w-20 h-2 bg-primary mx-auto md:mx-0" />
                  
                  <p className="text-lg md:text-xl font-black text-secondary leading-tight uppercase tracking-widest">
                    Available for dine-in & takeout ✨
                  </p>
                  
                  <p className="text-base text-foreground/80 font-bold uppercase tracking-widest leading-relaxed">
                    {selectedSpecial.description || "Every day brings a new harvest. Our daily specials are carefully curated to showcase the seasonal best of Filipino home cooking."}
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
