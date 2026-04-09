"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type GalleryItem = {
  id: number | string;
  title: string;
  category: string;
  image: string;
  description?: string;
};

interface LamesaGalleryProps {
  items: GalleryItem[];
}

export default function LamesaGallery({ items }: LamesaGalleryProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
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
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedItem]);

  return (
    <div className="relative group/gallery">
      {/* Slider Navigation */}
      <div className="absolute top-[50%] -translate-y-1/2 left-[-1rem] right-[-1rem] md:left-[-4rem] md:right-[-4rem] z-20 flex justify-between pointer-events-none px-4 lg:px-0">
        <button
          onClick={() => scroll("left")}
          className="pointer-events-auto bg-primary text-white p-4 md:p-8 shadow-2xl hover:scale-110 active:scale-95 transition-all skew-x-[-15deg] flex items-center justify-center border-r-4 border-secondary/30"
        >
          <ChevronLeft size={48} strokeWidth={4} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="pointer-events-auto bg-primary text-white p-4 md:p-8 shadow-2xl hover:scale-110 active:scale-95 transition-all skew-x-[-15deg] flex items-center justify-center border-l-4 border-secondary/30"
        >
          <ChevronRight size={48} strokeWidth={4} />
        </button>
      </div>

      {/* Gallery Slider */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 pb-12 cursor-grab no-scrollbar snap-x snap-mandatory px-4 lg:px-0"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex-shrink-0 w-[85vw] sm:w-[45vw] lg:w-[30vw] snap-center"
          >
            <div
              onClick={() => setSelectedItem(item)}
              className="bg-white border-[6px] border-secondary overflow-hidden shadow-2xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer relative aspect-[4/5] md:aspect-square"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white p-6 shadow-2xl text-center transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-2xl font-black text-foreground uppercase tracking-tighter italic mb-1">{item.title}</h3>
                  <p className="text-secondary font-black uppercase text-xs tracking-widest">{item.category}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Gallery Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-secondary/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-white border-[12px] border-secondary shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 z-20 bg-primary text-white p-2 hover:rotate-90 transition-transform active:scale-90"
              >
                <X size={32} strokeWidth={3} />
              </button>

              <div className="w-full md:w-3/5 aspect-video md:aspect-auto h-96 md:h-auto relative">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full md:w-2/5 p-12 flex flex-col justify-center bg-white">
                <div className="space-y-8">
                  <div className="space-y-3">
                    <span className="inline-block bg-accent px-4 py-1 text-black font-black uppercase text-xs tracking-widest skew-x-[-15deg]">
                      {selectedItem.category}
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-foreground uppercase tracking-tighter leading-none italic">
                      {selectedItem.title}
                    </h2>
                  </div>
                  
                  <div className="w-24 h-3 bg-primary" />
                  
                  <p className="text-lg text-foreground/80 font-bold uppercase tracking-widest leading-relaxed">
                    {selectedItem.description || "A glimpse into the Lamesa dining experience at P'lengke — where tradition and community meet on every plate."}
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
    </div>
  );
}
