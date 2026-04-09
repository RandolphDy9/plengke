"use client";

import { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, LayoutGrid, Grid2x2 } from "lucide-react";

type GroceryItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  inStock: boolean;
  featured?: boolean;
};

type GroceryStoreProps = {
  initialItems: GroceryItem[];
};

const itemsPerPageOptions = [12, 24, 36, 48];

const GRID_COLS = {
  4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
} as const;

type ColCount = keyof typeof GRID_COLS;

export default function GroceryStore({ initialItems = [] }: GroceryStoreProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cols, setCols] = useState<ColCount>(4);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(initialItems.map((item) => item.category))
    ).sort();
    return ["All", ...uniqueCategories];
  }, [initialItems]);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") return initialItems;
    return initialItems.filter((item) => item.category === selectedCategory);
  }, [selectedCategory, initialItems]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, itemsPerPage]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    const nextPage = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="py-20 min-h-screen">
      {/* Category Filter */}
      <div className="mb-16 px-4">
        <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar sm:flex-wrap sm:justify-center sm:pb-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-8 py-4 font-black uppercase tracking-widest transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category
                  ? "bg-secondary text-white shadow-xl rotate-1"
                  : "bg-white border-2 border-secondary/30 text-secondary hover:border-secondary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Toolbar: columns toggle + items per page */}
      <div className="container mx-auto px-4 mb-8 flex flex-wrap items-center justify-between gap-6 bg-secondary/5 p-6 rounded-none border-t-4 border-secondary">
        {/* Columns toggle */}
        <div className="hidden md:flex items-center gap-4">
          <span className="text-sm font-black uppercase tracking-widest text-secondary">View Grid</span>
          <div className="flex border-2 border-secondary overflow-hidden">
            <button
              onClick={() => setCols(4)}
              aria-label="4 columns"
              className={`flex items-center gap-2 px-4 py-2 text-xs font-black uppercase transition-colors ${
                cols === 4 ? "bg-secondary text-white" : "bg-white text-secondary hover:bg-secondary/10"
              }`}
            >
              <Grid2x2 size={16} strokeWidth={3} />
              4 Cols
            </button>
            <button
              onClick={() => setCols(6)}
              aria-label="6 columns"
              className={`flex items-center gap-2 px-4 py-2 text-xs font-black uppercase transition-colors border-l-2 border-secondary ${
                cols === 6 ? "bg-secondary text-white" : "bg-white text-secondary hover:bg-secondary/10"
              }`}
            >
              <LayoutGrid size={16} strokeWidth={3} />
              6 Cols
            </button>
          </div>
        </div>

        {/* Items per page */}
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

      {/* Grid */}
      <div className={`grid ${GRID_COLS[cols]} gap-3 md:gap-8 mb-24 container mx-auto px-4`}>
        {paginatedItems.map((item) => (
          <div key={item.id} className="border-2 border-secondary rounded-none p-4 bg-white relative shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group">
            <div className="relative overflow-hidden aspect-square mb-4">
              <img
                src={item.image}
                alt={item.name}
                className={`h-full w-full object-contain transition-transform duration-500 group-hover:scale-110 ${!item.inStock ? "opacity-30" : ""}`}
              />
              {!item.inStock && (
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                  <span className="bg-primary text-white px-4 py-2 font-black text-sm uppercase tracking-widest skew-x-[-12deg]">
                    Sold Out
                  </span>
                </div>
              )}
              {item.featured && item.inStock && (
                <div className="absolute top-0 left-0 bg-secondary text-white px-3 py-1 font-black text-[10px] uppercase tracking-[0.2em] skew-x-[-15deg]">
                  FEATURED
                </div>
              )}
              {item.originalPrice && item.inStock && (
                <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 font-black text-[10px] uppercase tracking-[0.2em] skew-x-[15deg]">
                  SAVE
                </div>
              )}
            </div>
            <h3 className={`font-black text-sm md:text-base uppercase tracking-tighter leading-none mb-2 line-clamp-2 ${!item.inStock ? "text-gray-300" : "text-foreground group-hover:text-primary"}`}>
              {item.name}
            </h3>
            <div className="flex items-center gap-2">
              <p className={`font-black text-lg ${!item.inStock ? "text-gray-300" : "text-primary"}`}>
                ${item.price.toFixed(2)}
              </p>
              {item.originalPrice && item.inStock && (
                <p className="text-xs text-secondary/40 line-through font-bold">
                  ${item.originalPrice.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 md:gap-3 container mx-auto px-4 mt-12 flex-wrap">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-3 md:p-4 bg-white border-2 border-secondary text-secondary font-black transition-all hover:bg-secondary hover:text-white disabled:opacity-20"
            aria-label="Previous page"
          >
            <ChevronLeft size={24} strokeWidth={3} />
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

              return pages.map((page, i) => (
                typeof page === "number" ? (
                  <button
                    key={i}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 md:w-12 md:h-12 font-black border-2 border-secondary transition-all ${
                      page === currentPage
                        ? "bg-secondary text-white shadow-lg"
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
            <ChevronRight size={24} strokeWidth={3} />
          </button>
        </div>
      )}

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
