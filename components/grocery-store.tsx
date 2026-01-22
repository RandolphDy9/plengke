"use client";

import { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

export default function GroceryStore({ initialItems = [] }: GroceryStoreProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get unique categories from items
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(initialItems.map(item => item.category))
    ).sort();
    return ["All", ...uniqueCategories];
  }, [initialItems]);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") return initialItems;
    return initialItems.filter(item => item.category === selectedCategory);
  }, [selectedCategory, initialItems]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Reset page when filter or items-per-page changes
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
      <div className="mb-8 flex flex-wrap gap-3 justify-center">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
              selectedCategory === category
                ? "bg-linear-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                : "bg-white/60 backdrop-blur-sm border-2 border-orange-500/30 text-orange-600 hover:border-orange-500 hover:bg-white/80"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-12 container mx-auto px-4">
        {paginatedItems.map(item => (
          <div key={item.id} className="border rounded-xl p-4 bg-white relative">
            <div className="relative">
              <img 
                src={item.image} 
                alt={item.name} 
                className={`h-40 w-full object-contain rounded ${!item.inStock ? "opacity-50" : ""}`} 
              />
              {!item.inStock && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded">
                  <span className="bg-white/90 text-gray-800 px-4 py-2 rounded-full font-bold text-sm">
                    Out of Stock
                  </span>
                </div>
              )}
              {item.featured && item.inStock && (
                <div className="absolute top-2 left-2 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  FEATURED
                </div>
              )}
              {item.originalPrice && item.inStock && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  SALE
                </div>
              )}
            </div>
            <h3 className={`mt-2 font-bold ${!item.inStock ? "text-gray-400" : ""}`}>
              {item.name}
            </h3>
            <div className="flex items-center gap-2">
              <p className={`font-bold ${!item.inStock ? "text-gray-400 line-through" : "text-orange-600"}`}>
                ${item.price.toFixed(2)}
              </p>
              {item.originalPrice && item.inStock && (
                <p className="text-sm text-gray-500 line-through">
                  ${item.originalPrice.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className={`flex items-center gap-2 container mx-auto px-4 ${filteredItems.length > 12 ? "justify-between" : "justify-end"}`}>

        {/* Items Per Page */}
        { filteredItems.length > 12 && <div className="flex justify-center mb-6">
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
        </div> }

        {/* Pagination */}
        <div className="flex justify-between items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 bg-white/60 backdrop-blur-sm border-2 border-orange-500/30 text-orange-600 hover:border-orange-500 hover:bg-white/80"
            aria-label="Previous page"
          >
            <ChevronLeft size={20} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
                page === currentPage
                  ? "bg-linear-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                  : "bg-white/60 backdrop-blur-sm border-2 border-orange-500/30 text-orange-600 hover:border-orange-500 hover:bg-white/80"
              }`}
              aria-label={`Go to page ${page}`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 bg-white/60 backdrop-blur-sm border-2 border-orange-500/30 text-orange-600 hover:border-orange-500 hover:bg-white/80"
            aria-label="Next page"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

    </section>
  );
}
