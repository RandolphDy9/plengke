"use client";

import { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, LayoutGrid, Grid2x2, X, Sun, Sparkles, ShoppingBag, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type FilipianianaItem = {
  id: string;
  name: string;
  category: string;
  description?: string;
  price: string;
  originalPrice?: string;
  image: string;
  inStock: boolean;
  featured?: boolean;
};

type FilipianianaContent = {
  title: string;
  subtitle: string;
  eyebrowLabel: string;
  badgeLabel: string;
  cardOverlayText: string;
  emptyStateText: string;
  soldOutText: string;
  card1Title: string;
  card1Description: string;
  card2Title: string;
  card2Description: string;
  card3Title: string;
  card3Description: string;
};

const itemsPerPageOptions = [12, 24, 36, 48];

const GRID_COLS = {
  4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
} as const;

type ColCount = keyof typeof GRID_COLS;

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "apparel", label: "Apparel" },
  { id: "souvenirs", label: "Souvenirs" },
  { id: "at-iba-pa", label: "At iba pa" },
];

const HERITAGE_PATTERN = "/images/textures/filipino-heritage-pattern.png";
const FLAG_IMAGE = "/images/philippine-flag-draped.png";

export default function Filipiniana({ initialItems = [], content }: { initialItems: FilipianianaItem[]; content: FilipianianaContent }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [cols, setCols] = useState<ColCount>(4);
  const [selectedItem, setSelectedItem] = useState<FilipianianaItem | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return initialItems;
    return initialItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, initialItems]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, itemsPerPage]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    const nextPage = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedItem]);

  return (
    <section className="relative pt-48 pb-24 min-h-screen bg-[#FBFAF7] overflow-hidden">
      {/* Filipino Heritage Background Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-80" 
        style={{ 
          backgroundImage: `url("${HERITAGE_PATTERN}")`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat'
        }}
      ></div>
      
      {/* Draped Philippine Flag Backdrop */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none opacity-20 z-0 select-none">
        <img 
          src={FLAG_IMAGE} 
          alt="" 
          className="w-full h-full object-contain object-top-left scale-150 -translate-x-12 -translate-y-12"
        />
      </div>

      {/* Decorative Accents */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-80 h-80 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Heritage Header */}
        <div className="text-center mb-16 relative">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-4 mb-6"
          >
            <div className="h-[2px] w-12 bg-primary/30" />
            <span className="text-primary font-black uppercase tracking-[0.5em] text-[10px]">{content.eyebrowLabel}</span>
            <div className="h-[2px] w-12 bg-primary/30" />
          </motion.div>
          
          <h1 className="text-6xl md:text-9xl font-black text-foreground uppercase tracking-tighter leading-none mb-6 italic transition-all">
            {content.title}<div className="absolute -top-6 -right-10 text-primary animate-pulse hidden md:block"><Sun size={48} strokeWidth={3} /></div>
          </h1>
          <p className="max-w-2xl mx-auto text-foreground/60 font-bold uppercase tracking-widest text-xs md:text-sm leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        {/* Narrative Section: Pamana ng Luzon */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto mb-32 relative group"
        >
          {/* Placard Background */}
          <div className="absolute inset-0 bg-white/70 opacity-50 backdrop-blur-md border-y-2 border-primary/20" />
          
          <div className="relative z-10 grid md:grid-cols-3 gap-12 p-12 md:p-16 text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4 group/item"
            >
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors duration-500 shadow-sm">
                  <Sparkles size={20} strokeWidth={3} />
                </div>
                <h3 className="text-lg font-black text-secondary tracking-widest uppercase italic">{content.card1Title}</h3>
              </div>
              <p className="text-[11px] font-bold text-foreground/70 uppercase tracking-widest leading-relaxed">
                {content.card1Description}
              </p>
              <div className="h-1 w-12 bg-primary/20 group-hover/item:w-full transition-all duration-700 mx-auto md:mx-0" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4 group/item"
            >
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover/item:bg-secondary group-hover/item:text-white transition-colors duration-500 shadow-sm">
                  <ShoppingBag size={20} strokeWidth={3} />
                </div>
                <h3 className="text-lg font-black text-secondary tracking-widest uppercase italic">{content.card2Title}</h3>
              </div>
              <p className="text-[11px] font-bold text-foreground/70 uppercase tracking-widest leading-relaxed">
                {content.card2Description}
              </p>
              <div className="h-1 w-12 bg-primary/20 group-hover/item:w-full transition-all duration-700 mx-auto md:mx-0" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4 group/item"
            >
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-secondary group-hover/item:bg-primary group-hover/item:text-white transition-colors duration-500 shadow-sm">
                  <ArrowUpRight size={20} strokeWidth={3} />
                </div>
                <h3 className="text-lg font-black text-secondary tracking-widest uppercase italic">{content.card3Title}</h3>
              </div>
              <p className="text-[11px] font-bold text-foreground/70 uppercase tracking-widest leading-relaxed">
                {content.card3Description}
              </p>
              <div className="h-1 w-12 bg-primary/20 group-hover/item:w-full transition-all duration-700 mx-auto md:mx-0" />
            </motion.div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <div className="mb-16">
          <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar sm:flex-wrap sm:justify-center sm:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-8 py-4 font-black uppercase tracking-widest transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === cat.id
                    ? "bg-secondary text-white shadow-xl rotate-1"
                    : "bg-white border-2 border-secondary/30 text-secondary hover:border-secondary"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Toolbar (Standardized) */}
        <div className="mb-12 flex flex-wrap items-center justify-between gap-6 bg-secondary/5 p-6 rounded-none border-t-4 border-secondary">
          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm font-black uppercase tracking-widest text-secondary text-foreground">View Grid</span>
            <div className="flex border-2 border-secondary overflow-hidden bg-white">
              <button
                onClick={() => setCols(4)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-black uppercase transition-colors ${
                  cols === 4 ? "bg-secondary text-white" : "bg-white text-secondary hover:bg-secondary/10"
                }`}
              >
                <Grid2x2 size={16} strokeWidth={3} />
                4 Cols
              </button>
              <button
                onClick={() => setCols(6)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-black uppercase transition-colors border-l-2 border-secondary ${
                  cols === 6 ? "bg-secondary text-white" : "bg-white text-secondary hover:bg-secondary/10"
                }`}
              >
                <LayoutGrid size={16} strokeWidth={3} />
                6 Cols
              </button>
            </div>
          </div>

          <div className="flex items-center gap-10">
            <div className="flex items-center gap-4">
              <span className="text-sm font-black uppercase tracking-widest text-secondary text-foreground">Show</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="px-4 py-2 border-2 border-secondary bg-white text-secondary font-black uppercase text-xs focus:outline-none focus:bg-secondary focus:text-white transition-colors cursor-pointer"
              >
                {itemsPerPageOptions.map((option) => (
                  <option key={option} value={option}>{option} Items</option>
                ))}
              </select>
            </div>
            <span className="text-sm font-black uppercase tracking-widest text-secondary opacity-50">
              Total {filteredItems.length}
            </span>
          </div>
        </div>

        {/* Product Grid (Standardized Card Layout) */}
        <div className={`grid ${GRID_COLS[cols]} gap-6 md:gap-10`}>
          {paginatedItems.length > 0 ? (
            paginatedItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index % 12) * 0.05 }}
                className="bg-white rounded-none border-2 border-secondary overflow-hidden shadow-lg transition-all duration-300 hover:scale-[1.03] group relative cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                {/* Image Container with Consistent Aspect Ratio */}
                <div className="relative aspect-square overflow-hidden bg-white">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className={`w-full h-full object-contain p-4 transition-transform duration-1000 group-hover:scale-110 ${!item.inStock ? "grayscale opacity-30" : ""}`}
                  />
                  
                  {/* Price Badge (Menu Style) */}
                  <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 font-black text-lg skew-x-[-12deg] shadow-lg group-hover:scale-110 transition-transform z-10">
                    {item.price}
                  </div>

                  {/* Feature Stickers */}
                  <div className="absolute top-4 left-0 pointer-events-none z-10">
                    <div className="bg-secondary text-white px-4 py-1 text-[9px] font-black tracking-widest uppercase flex items-center gap-2 shadow-lg skew-x-[-15deg] -translate-x-2 group-hover:translate-x-0 transition-transform">
                      <Sun size={10} className="shrink-0" />
                      {content.badgeLabel}
                    </div>
                  </div>

                  {/* Hover Info Overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-secondary/95 backdrop-blur-sm p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <p className="text-[10px] font-black text-white uppercase tracking-widest text-center">{content.cardOverlayText}</p>
                  </div>

                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/5 flex items-center justify-center p-8">
                      <div className="w-full bg-white/95 py-4 text-center text-xs font-black uppercase tracking-widest text-secondary border-2 border-primary/20 shadow-2xl rotate-[-5deg]">
                        {content.soldOutText}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Content (Standardized) */}
                <div className="p-6">
                  <h3 className="text-xl font-black text-foreground uppercase tracking-tighter mb-1 group-hover:text-primary transition-colors line-clamp-1 leading-none italic">
                    {item.name}
                  </h3>
                  <div className="w-8 h-1 bg-primary mb-3 group-hover:w-full transition-all duration-300" />
                  <p className="text-[10px] font-bold text-secondary tracking-widest opacity-60 uppercase mb-2">CATEGORY: {item.category}</p>
                  {item.description && (
                    <p className="text-xs font-bold text-foreground/70 uppercase tracking-widest leading-tight line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-32 border-4 border-dashed border-secondary/10 bg-white/50">
              <Sun size={48} className="mx-auto text-secondary/20 mb-6" />
              <p className="text-secondary/40 text-xl font-black uppercase tracking-widest">
                {content.emptyStateText}
              </p>
            </div>
          )}
        </div>

        {/* Pagination (Festive Sun Style) */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 md:gap-4 mt-24 flex-wrap">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-4 md:p-5 bg-white border-2 border-secondary/20 text-secondary transition-all hover:bg-secondary hover:text-white disabled:opacity-20 shadow-sm"
              aria-label="Previous page"
            >
              <ChevronLeft size={24} strokeWidth={4} />
            </button>

            <div className="flex gap-1 md:gap-2">
              {(() => {
                const pages: (number | string)[] = [];
                const maxVisible = 1;

                if (totalPages <= 7) {
                  for (let i = 1; i <= totalPages; i++) pages.push(i);
                } else {
                  pages.push(1);
                  if (currentPage > maxVisible + 2) pages.push("...");
                  const start = Math.max(2, currentPage - maxVisible);
                  const end = Math.min(totalPages - 1, currentPage + maxVisible);
                  for (let i = start; i <= end; i++) pages.push(i);
                  if (currentPage < totalPages - (maxVisible + 1)) pages.push("...");
                  pages.push(totalPages);
                }

                return pages.map((page, i) =>
                  typeof page === "number" ? (
                    <button
                      key={i}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 md:w-12 md:h-12 font-black border-2 border-secondary transition-all ${
                        page === currentPage
                          ? "bg-secondary text-white shadow-xl translate-y-[-4px]"
                          : "bg-white text-secondary hover:bg-secondary/10"
                      }`}
                      aria-label={`Go to page ${page}`}
                    >
                      {page}
                    </button>
                  ) : (
                    <span key={i} className="w-8 md:w-10 h-10 md:h-12 flex items-center justify-center font-black text-secondary/30 text-xl tracking-tighter">
                      •••
                    </span>
                  )
                );
              })()}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-3 md:p-4 bg-white border-2 border-secondary text-secondary font-black transition-all hover:bg-secondary hover:text-white disabled:opacity-20"
              aria-label="Next page"
            >
              <ChevronRight size={24} strokeWidth={4} />
            </button>
          </div>
        )}
      </div>

      {/* Item Detail Modal */}
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
                  alt={selectedItem.name}
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-8 left-0 bg-primary text-white font-black text-2xl px-8 py-4 skew-x-[-12deg] -translate-x-2 shadow-2xl">
                  {selectedItem.price}
                </div>
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
                <div className="space-y-6 text-center md:text-left">
                  <div className="space-y-2">
                    <div className="flex gap-2 justify-center md:justify-start flex-wrap">
                      <span className="inline-block bg-accent px-4 py-1 text-black font-black uppercase text-xs tracking-widest skew-x-[-15deg]">
                        {selectedItem.category}
                      </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tighter leading-none italic">
                      {selectedItem.name}
                    </h2>
                  </div>

                  <div className="w-20 h-2 bg-primary mx-auto md:mx-0" />

                  {selectedItem.originalPrice && (
                    <p className="text-base text-secondary/50 line-through font-bold uppercase tracking-widest">
                      {selectedItem.originalPrice}
                    </p>
                  )}

                  {selectedItem.description && (
                    <p className="text-base text-foreground/80 font-bold uppercase tracking-widest leading-relaxed">
                      {selectedItem.description}
                    </p>
                  )}
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
