"use client";

import { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, LayoutGrid, Grid2x2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import PageHeader from "./page-header";

type MenuItem = {
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
};

const itemsPerPageOptions = [6, 12, 18, 24];

const GRID_COLS = {
  4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
} as const;

type ColCount = keyof typeof GRID_COLS;

const defaultMenuItems: MenuItem[] = [
  ...Array(12).fill(null).map((_, i) => ({
    name: ["Bulalo", "Kare-Kare", "BBQ Skewers", "Bistek", "Lechon", "Adobo", "Sinigang", "Pancit", "Lumpia", "Sisig", "Dinuguan", "Bicol Express"][i % 12],
    category: ["daily", "specials", "kakanin-desserts", "summer-delight", "cafe-corner"][i % 5],
    description: "Authentic Filipino dish served fresh daily from our kitchen to your table. Prepared with the finest ingredients to give you that authentic home-cooked taste you've been craving.",
    price: `$${12 + i}.99`,
    image: `/images/food-${(i % 6) + 1}.jpg`
  }))
];

const categories = [
  { id: "all", label: "All" },
  { id: "daily", label: "Daily" },
  { id: "specials", label: "Specials" },
  { id: "kakanin-desserts", label: "Kakanin/Desserts" },
  { id: "cafe-corner", label: "Cafe Corner" },
];

export default function Menu({
  initialItems,
  title,
  subtitle,
  showPagination = true,
}: {
  initialItems?: MenuItem[];
  title?: string;
  subtitle?: string;
  showPagination?: boolean;
}) {
  const menuItems = initialItems && initialItems.length > 0 ? initialItems : defaultMenuItems;

  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(showPagination ? 12 : 8);
  const [cols, setCols] = useState<ColCount>(4);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") {
      return menuItems;
    }
    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, menuItems]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, itemsPerPage]);

  const paginatedItems = useMemo(() => {
    if (!showPagination) return filteredItems.slice(0, itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage, showPagination]);

  const handlePageChange = (page: number) => {
    const nextPage = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    <section id="menu" className="py-20 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            <PageHeader title={title || "Karenderya"} subtitle={subtitle} />
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-16">
          <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar sm:flex-wrap sm:justify-center sm:pb-0">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-8 py-4 font-black uppercase tracking-widest transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category.id
                    ? "bg-secondary text-white shadow-xl rotate-1"
                    : "bg-white border-2 border-secondary/30 text-secondary hover:border-secondary"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Toolbar - Only show if pagination is enabled */}
        {showPagination && (
          <div className="container mx-auto px-4 mb-8 flex flex-wrap items-center justify-between gap-6 bg-secondary/5 p-6 rounded-none border-t-4 border-secondary">
            <div className="hidden md:flex items-center gap-4">
              <span className="text-sm font-black uppercase tracking-widest text-secondary">View Grid</span>
              <div className="flex border-2 border-secondary overflow-hidden">
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

            <div className="flex items-center gap-4">
              <span className="text-sm font-black uppercase tracking-widest text-secondary">Show</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="px-4 py-2 border-2 border-secondary bg-white text-secondary font-black uppercase text-xs focus:outline-none focus:bg-secondary focus:text-white transition-colors cursor-pointer"
              >
                {itemsPerPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option} Items
                  </option>
                ))}
              </select>
              <span className="text-sm font-black uppercase tracking-widest text-secondary opacity-50">
                Total {filteredItems.length}
              </span>
            </div>
          </div>
        )}

        {/* Menu Grid */}
        <div className={`grid ${GRID_COLS[cols]} gap-6 md:gap-10`}>
          {paginatedItems.length > 0 ? (
            paginatedItems.map((item, index) => (
              <motion.div
                key={`${item.name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-none border-2 border-secondary overflow-hidden shadow-lg transition-all duration-300 hover:scale-[1.03] group relative cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 font-black text-lg skew-x-[-12deg] shadow-lg group-hover:scale-110 transition-transform">
                    {item.price}
                  </div>
                  <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-secondary px-6 py-3 font-black uppercase text-xs tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform">
                      View Details
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black text-foreground uppercase tracking-tighter mb-1 group-hover:text-primary transition-colors line-clamp-1 leading-none">
                    {item.name}
                  </h3>
                  <div className="w-8 h-1 bg-primary mb-3 group-hover:w-full transition-all duration-300" />
                  <p className="text-[10px] font-bold text-secondary tracking-widest opacity-60 uppercase mb-2">CATEGORY: {item.category}</p>
                  <p className="text-xs font-bold text-foreground/70 uppercase tracking-widest leading-tight line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-24 border-4 border-dashed border-secondary/10">
              <p className="text-secondary/60 text-xl font-black uppercase tracking-widest">
                No items found in this category. 🍱
              </p>
            </div>
          )}
        </div>

        {/* View All Button (Home Screen) */}
        {!showPagination && (
          <div className="mt-16 flex justify-center">
            <Link 
              href="/menu"
              className="group relative px-12 py-5 bg-primary text-white font-black text-xl uppercase tracking-[0.2em] overflow-hidden"
            >
              <span className="relative z-10">See Full Menu 🥘</span>
              <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
          </div>
        )}

        {/* Pagination - Only show if pagination is enabled */}
        {showPagination && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 md:gap-3 mt-20 flex-wrap">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-3 md:p-4 bg-white border-2 border-secondary text-secondary font-black transition-all hover:bg-secondary hover:text-white disabled:opacity-20"
              aria-label="Previous page"
            >
              <ChevronLeft size={24} strokeWidth={4} />
            </button>

            <div className="flex gap-1 md:gap-2">
              {(() => {
                const pages: (number | string)[] = [];
                const maxVisible = 1; // Number of pages to show around current
                
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

                return pages.map((page, i) => (
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
                ));
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

              <div className="w-full md:w-1/2 aspect-square md:aspect-auto h-64 md:h-auto relative">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-8 left-0 bg-primary text-white font-black text-2xl px-8 py-4 skew-x-[-12deg] -translate-x-2 shadow-2xl">
                  {selectedItem.price}
                </div>
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className="space-y-6 text-center md:text-left">
                  <div className="space-y-2">
                    <span className="inline-block bg-accent px-4 py-1 text-black font-black uppercase text-xs tracking-widest skew-x-[-15deg]">
                      {selectedItem.category}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tighter leading-none italic">
                      {selectedItem.name}
                    </h2>
                  </div>
                  
                  <div className="w-20 h-2 bg-primary mx-auto md:mx-0" />
                  
                  <p className="text-lg md:text-xl font-black text-secondary leading-tight uppercase tracking-widest">
                    Delicious Filipino Classics ✨
                  </p>
                  
                  <p className="text-base text-foreground/80 font-bold uppercase tracking-widest leading-relaxed">
                    {selectedItem.description}
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
