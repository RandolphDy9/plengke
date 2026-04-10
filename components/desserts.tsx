"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import PageHeader from "@/components/page-header";

type DessertItem = { 
  image: string; 
  alt: string;
  title: string;
  description?: string;
};

const defaultDesserts: DessertItem[] = [
  { 
    title: "Leche Flan",
    image: "/images/dessert-4.jpg", 
    alt: "Leche flan - creamy caramel custard",
    description: "The ultimate Filipino dessert. Our leche flan is ultra-creamy, velvety, and topped with a rich caramel syrup that melts in your mouth. Prepared using a traditional family recipe that ensures the perfect silky consistency every time."
  },
  { 
    title: "Ube Royale Cake",
    image: "/images/dessert-2.jpg", 
    alt: "Ube cake - purple yam dessert",
    description: "A show-stopping purple yam sponge cake layered with creamy ube halaya frosting. Vibrant, light, and authentically Filipino. Each layer is infused with premium ube from the Philippines for that unmistakable earthy sweetness."
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
  const desserts = items && items.length > 0 ? items : defaultDesserts;
  const [selectedDessert, setSelectedDessert] = useState<DessertItem | null>(null);
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
    if (selectedDessert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedDessert]);

  return (
    <section id="desserts" className="py-24 bg-accent relative overflow-hidden">
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
        <div className="absolute top-[60%] md:top-[50%] left-0 right-0 z-10 flex justify-between px-4 pointer-events-none">
          <button
            onClick={() => scroll("left")}
            className="pointer-events-auto bg-primary text-white p-5 shadow-2xl hover:scale-110 active:scale-95 transition-all skew-x-[-12deg] flex items-center justify-center border-2 border-white/20"
            aria-label="Previous dessert"
          >
            <ChevronLeft size={40} strokeWidth={4} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="pointer-events-auto bg-primary text-white p-5 shadow-2xl hover:scale-110 active:scale-95 transition-all skew-x-[-12deg] flex items-center justify-center border-2 border-white/20"
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
          {desserts.map((dessert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex-shrink-0 w-[280px] md:w-[400px] snap-center"
            >
              <div
                onClick={() => setSelectedDessert(dessert)}
                className="animate-on-scroll bg-white rounded-none border-4 border-secondary overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.03] group cursor-pointer relative"
              >
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={dessert.image || "/placeholder.svg"}
                    alt={dessert.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                    <span className="bg-white text-secondary px-6 py-3 font-black uppercase text-xs tracking-[0.2em] translate-y-4 group-hover:translate-y-0 transition-transform shadow-2xl skew-x-[-10deg]">
                      View Details
                    </span>
                    <h3 className="text-white font-black uppercase text-2xl tracking-tighter mt-4 drop-shadow-lg scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 italic">
                      {dessert.title}
                    </h3>
                  </div>

                  {/* Icon label */}
                  <div className="absolute top-4 left-4 bg-secondary text-white p-2 skew-x-[-12deg] shadow-lg group-hover:scale-110 transition-transform">
                    <Sparkles size={20} />
                  </div>
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
              className="absolute inset-0 bg-secondary/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-4xl bg-white border-[12px] border-primary shadow-[0_60px_120px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedDessert(null)}
                className="absolute top-4 right-4 z-20 bg-secondary text-white p-2 hover:rotate-90 transition-transform active:scale-90"
              >
                <X size={32} strokeWidth={3} />
              </button>

              <div className="w-full md:w-1/2 relative overflow-hidden bg-secondary/5 flex items-center justify-center">
                <img 
                  src={selectedDessert.image} 
                  alt={selectedDessert.alt} 
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-8 left-0 bg-secondary text-white font-black text-2xl px-10 py-5 skew-x-[-12deg] -translate-x-3 shadow-2xl">
                  PHP SPECIAL
                </div>
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#FFF]">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="inline-block bg-accent px-4 py-1 text-black font-black uppercase text-xs tracking-widest skew-x-[-15deg]">
                      Sweet Delights
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-foreground uppercase tracking-tighter leading-none italic block">
                      {selectedDessert.title}
                    </h2>
                  </div>
                  
                  <div className="w-24 h-3 bg-primary" />
                  
                  <p className="text-lg md:text-xl font-black text-secondary/60 leading-tight uppercase tracking-widest italic">
                    Authentic Filipino Sweetness
                  </p>
                  
                  <p className="text-base text-foreground/80 font-bold uppercase tracking-widest leading-relaxed">
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


