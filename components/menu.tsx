"use client";

import { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PageHeader from "./page-header";

type MenuItem = {
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
};

const ITEMS_PER_PAGE = 6;

const defaultMenuItems: MenuItem[] = [
  { name: "Bulalo", category: "soups", description: "Traditional beef shank soup with vegetables and bone marrow", price: "$16.99", image: "/images/food-1.jpg" },
  { name: "Kare-Kare", category: "mains", description: "Rich peanut stew with oxtail and vegetables", price: "$18.99", image: "/images/food-6.jpg" },
  { name: "BBQ Skewers", category: "grilled", description: "Glazed chicken skewers with sweet and savory sauce", price: "$12.99", image: "/images/food-4.jpg" },
  { name: "Bistek", category: "mains", description: "Filipino beef steak with onions in savory sauce", price: "$15.99", image: "/images/food-5.jpg" },
  { name: "Shredded Chicken", category: "mains", description: "Tender shredded chicken with peppers and spices", price: "$14.99", image: "/images/food-2.jpg" },
  { name: "Spicy Beef", category: "mains", description: "Beef in rich curry sauce with bell peppers", price: "$17.99", image: "/images/food-3.jpg" },
];

const categories = [
  { id: "all", label: "All" },
  { id: "mains", label: "Mains" },
  { id: "soups", label: "Soup" },
  { id: "grilled", label: "Grilled" },
  { id: "seafood", label: "Seafood" },
  { id: "pancit", label: "Pancit" },
  { id: "desserts", label: "Desserts" },
  { id: "drinks", label: "Drinks" },
];

export default function Menu({
  initialItems,
  title,
  subtitle,
}: {
  initialItems?: MenuItem[];
  title?: string;
  subtitle?: string;
}) {
  const menuItems = initialItems && initialItems.length > 0 ? initialItems : defaultMenuItems;

  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") {
      return menuItems;
    }
    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, menuItems]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  useEffect(() => {
    const isVisible =
      activeCategory === "all" ||
      menuItems.some((item) => item.category === activeCategory);

    if (!isVisible) {
      setActiveCategory("all");
    }
  }, [menuItems, activeCategory]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  const handlePageChange = (page: number) => {
    const nextPage = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="menu" className="py-20 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        {(title || subtitle) && (
          <div className="mb-12">
            <PageHeader title={title || "Our Menu"} subtitle={subtitle} />
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar sm:flex-wrap sm:justify-center sm:pb-0">
            {categories
              .filter(
                (category) =>
                  category.id === "all" ||
                  menuItems.some((item) => item.category === category.id)
              )
              .map((category) => {
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-all duration-300 hover:scale-105 ${
                      activeCategory === category.id
                        ? "bg-linear-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                        : "bg-white/60 backdrop-blur-sm border-2 border-orange-500/30 text-orange-600 hover:border-orange-500 hover:bg-white/80"
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedItems.length > 0 ? (
            paginatedItems.map((item, index) => (
              <div
                key={item.name}
                style={{ animationDelay: `${index * 100}ms` }}
                className="bg-white/60 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-rotate-1 group animate-fade-in"
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3 gap-2">
                    <h3 className="text-xl md:text-2xl font-bold text-teal-900 group-hover:text-orange-600 transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-xl md:text-2xl font-bold text-orange-600 whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-teal-800/70 mb-4 leading-relaxed line-clamp-3 md:line-clamp-none">
                    {item.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-teal-800/60 text-lg">
                No items found in this category.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-1 md:gap-2 mt-12 px-4">
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
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }

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
