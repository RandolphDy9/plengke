"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
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
    description: "The ultimate Filipino dessert. Our leche flan is ultra-creamy, velvety, and topped with a rich caramel syrup that melts in your mouth."
  },
  { 
    title: "Ube Royale Cake",
    image: "/images/dessert-2.jpg", 
    alt: "Ube cake - purple yam dessert",
    description: "A show-stopping purple yam sponge cake layered with creamy ube halaya frosting. Vibrant, light, and authentically Filipino."
  },
  { 
    title: "Mango Pie",
    image: "/images/dessert-3.jpg", 
    alt: "Mango or buko pie with golden custard filling",
    description: "Flaky crust filled with the sweetest tropical mangoes. A golden, buttery treat that captures the essence of summer in every bite."
  },
  { 
    title: "Fiesta Platter",
    image: "/images/dessert-1.jpg", 
    alt: "Assorted Filipino desserts platter",
    description: "Can't decide? Our Fiesta Platter features a curated selection of traditional kakanin, puto, and sweet delicacies for the whole family."
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
                className="animate-on-scroll bg-white rounded-none border-4 border-secondary overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.03] group cursor-default relative"
              >
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={dessert.image || "/placeholder.svg"}
                    alt={dessert.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}

