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
      <div className="mb-8 px-4">
        <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar sm:flex-wrap sm:justify-center sm:pb-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-all duration-300 hover:scale-105 ${
                selectedCategory === category
                  ? "bg-linear-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                  : "bg-white/60 backdrop-blur-sm border-2 border-orange-500/30 text-orange-600 hover:border-orange-500 hover:bg-white/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Toolbar: columns toggle + items per page */}
      <div className="container mx-auto px-4 mb-4 flex flex-wrap items-center justify-between gap-3">
        {/* Columns toggle */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex rounded-lg border border-orange-300 overflow-hidden">
            <button
              onClick={() => setCols(4)}
              aria-label="4 columns"
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold transition-colors ${
                cols === 4
                  ? "bg-orange-500 text-white"
                  : "bg-white text-orange-600 hover:bg-orange-50"
              }`}
            >
              <Grid2x2 size={16} />
              4
            </button>
            <button
              onClick={() => setCols(6)}
              aria-label="6 columns"
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold transition-colors border-l border-orange-300 ${
                cols === 6
                  ? "bg-orange-500 text-white"
                  : "bg-white text-orange-600 hover:bg-orange-50"
              }`}
            >
              <LayoutGrid size={16} />
              6
            </button>
          </div>
        </div>

        {/* Items per page */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 font-semibold">Show</span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="px-3 py-2 rounded-lg border border-orange-300 bg-white text-orange-600 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-600 font-semibold">
            of {filteredItems.length} items
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className={`grid ${GRID_COLS[cols]} gap-3 md:gap-4 mb-12 container mx-auto px-4`}>
        {paginatedItems.map((item) => (
          <div key={item.id} className="border rounded-xl p-3 md:p-4 bg-white relative shadow-sm hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className={`h-32 md:h-40 w-full object-contain rounded ${!item.inStock ? "opacity-50" : ""}`}
              />
              {!item.inStock && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded">
                  <span className="bg-white/90 text-gray-800 px-3 py-1.5 md:px-4 md:py-2 rounded-full font-bold text-xs md:text-sm whitespace-nowrap">
                    Out of Stock
                  </span>
                </div>
              )}
              {item.featured && item.inStock && (
                <div className="absolute top-1 left-1 md:top-2 md:left-2 bg-orange-600 text-white px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold">
                  FEATURED
                </div>
              )}
              {item.originalPrice && item.inStock && (
                <div className="absolute top-1 right-1 md:top-2 md:right-2 bg-red-500 text-white px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold">
                  SALE
                </div>
              )}
            </div>
            <h3 className={`mt-2 font-bold text-sm md:text-base line-clamp-2 ${!item.inStock ? "text-gray-400" : "text-teal-900"}`}>
              {item.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <p className={`font-bold text-sm md:text-base ${!item.inStock ? "text-gray-400 line-through" : "text-orange-600"}`}>
                ${item.price.toFixed(2)}
              </p>
              {item.originalPrice && item.inStock && (
                <p className="text-[10px] md:text-xs text-gray-500 line-through">
                  ${item.originalPrice.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-1 md:gap-2 container mx-auto px-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 md:px-4 md:py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed bg-white/60 backdrop-blur-sm border-2 border-orange-500/30 text-orange-600"
            aria-label="Previous page"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-1 overflow-x-auto no-scrollbar max-w-[200px] sm:max-w-none px-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`min-w-[40px] h-[40px] md:min-w-[50px] md:h-[50px] rounded-full font-semibold transition-all duration-300 flex items-center justify-center ${
                  page === currentPage
                    ? "bg-linear-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                    : "bg-white/60 backdrop-blur-sm border-2 border-orange-500/30 text-orange-600"
                }`}
                aria-label={`Go to page ${page}`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 md:px-4 md:py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed bg-white/60 backdrop-blur-sm border-2 border-orange-500/30 text-orange-600"
            aria-label="Next page"
          >
            <ChevronRight size={20} />
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
