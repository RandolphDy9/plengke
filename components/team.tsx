"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import PageHeader from "@/components/page-header";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  alt: string;
  tagline?: string;
  description?: string;
};

const defaultMembers: TeamMember[] = [
  { 
    name: "Maria", 
    role: "Kitchen Manager", 
    image: "/images/staff-2.jpg", 
    alt: "Chef proudly presenting large lechon roll",
    description: "With over 15 years of experience in traditional Filipino cuisine, Maria ensures every dish that leaves our kitchen carries the authentic taste of home."
  },
  { 
    name: "Miguel", 
    role: "Head Chef", 
    image: "/images/staff-1.jpg", 
    alt: "Team member holding lechon roll with warm smile",
    description: "Miguel specializes in modern twists on Luzon classics. His passion for fresh local ingredients is what makes P'lengke stand out."
  },
  { 
    name: "Ana", 
    role: "Store Manager", 
    image: "/images/staff-3.jpg", 
    alt: "Staff member displaying tray of lechon slices",
    description: "Ana is the heart of our store. She ensures that every customer feels like family from the moment they walk through our doors."
  },
  { 
    name: "Jun", 
    role: "Grill Master", 
    image: "/images/food-4.jpg", 
    alt: "Grill area",
    description: "Master of the open flame. Jun's secret BBQ glaze and precise grilling techniques are legendary in the community."
  },
];

type TeamProps = {
  members?: TeamMember[];
  title?: string;
  subtitle?: string;
};

export default function Team({ members, title, subtitle }: TeamProps) {
  const teamMembers = members && members.length > 0 ? members : defaultMembers;
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
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
    if (selectedMember) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedMember]);

  return (
    <section id="team" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <PageHeader
            title={title || "MEET OUR TEAM"}
            subtitle={subtitle || "THE PASSIONATE PEOPLE BEHIND YOUR FAVORITE FILIPINO DISHES"}
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

        {/* Team Slider */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 pb-12 cursor-grab no-scrollbar snap-x snap-mandatory px-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex-shrink-0 w-[280px] md:w-[350px] snap-center"
            >
              <div
                onClick={() => setSelectedMember(member)}
                className="bg-white border-2 border-secondary overflow-hidden shadow-xl transition-all duration-300 hover:scale-[1.03] group cursor-pointer relative"
              >
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* View Details Overlay */}
                  <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-secondary px-6 py-3 font-black uppercase text-xs tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform">
                      View Details
                    </span>
                  </div>
                </div>
                <div className="p-8 text-center bg-white">
                  <h3 className="text-2xl font-black text-foreground uppercase tracking-tighter mb-1 group-hover:text-primary transition-colors italic">
                    {member.name}
                  </h3>
                  <div className="w-12 h-1 bg-primary mx-auto mb-4 group-hover:w-full transition-all duration-300" />
                  <p className="text-secondary font-black uppercase tracking-[0.2em] text-xs">
                    {member.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Member Detail Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
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
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 z-20 bg-primary text-white p-2 hover:rotate-90 transition-transform active:scale-90"
              >
                <X size={32} strokeWidth={3} />
              </button>

              {/* Image Section */}
              <div className="w-full md:w-1/2 relative bg-secondary/5 flex items-center justify-center overflow-hidden">
                <img 
                  src={selectedMember.image} 
                  alt={selectedMember.name} 
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Text Section */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className="space-y-6 text-center md:text-left">
                  <div className="space-y-2">
                    <span className="inline-block bg-accent px-4 py-1 text-black font-black uppercase text-xs tracking-widest skew-x-[-15deg]">
                      {selectedMember.role}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tighter leading-none italic">
                      {selectedMember.name}
                    </h2>
                  </div>
                  
                  <div className="w-20 h-2 bg-primary mx-auto md:mx-0" />
                  
                  <p className="text-lg md:text-xl font-black text-secondary leading-tight uppercase tracking-widest">
                    {selectedMember.tagline || "The Soul behind the flavor ✨"}
                  </p>
                  
                  <p className="text-base text-foreground/80 font-bold uppercase tracking-widest leading-relaxed">
                    {selectedMember.description || "A vital part of the P'lengke family, bringing passion and authenticity to every aspect of our Filipino food journey."}
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
