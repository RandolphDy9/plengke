"use client";

import { useState, useMemo } from "react";
import { Utensils, ShoppingBag, Flame } from "lucide-react";

const menuItems = [
  {
    name: "Bulalo",
    category: "soups",
    description: "Traditional beef shank soup with vegetables and bone marrow",
    price: "$16.99",
    image: "/images/food-1.jpg",
  },
  {
    name: "Kare-Kare",
    category: "mains",
    description: "Rich peanut stew with oxtail and vegetables",
    price: "$18.99",
    image: "/images/food-6.jpg",
  },
  {
    name: "BBQ Skewers",
    category: "grilled",
    description: "Glazed chicken skewers with sweet and savory sauce",
    price: "$12.99",
    image: "/images/food-4.jpg",
  },
  {
    name: "Bistek",
    category: "mains",
    description: "Filipino beef steak with onions in savory sauce",
    price: "$15.99",
    image: "/images/food-5.jpg",
  },
  {
    name: "Shredded Chicken",
    category: "mains",
    description: "Tender shredded chicken with peppers and spices",
    price: "$14.99",
    image: "/images/food-2.jpg",
  },
  {
    name: "Spicy Beef",
    category: "mains",
    description: "Beef in rich curry sauce with bell peppers",
    price: "$17.99",
    image: "/images/food-3.jpg",
  },
];

const categories = [
  { id: "all", label: "All Dishes", icon: Utensils },
  { id: "soups", label: "Soups", icon: ShoppingBag },
  { id: "mains", label: "Main Dishes", icon: Utensils },
  { id: "grilled", label: "Grilled", icon: Flame },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") {
      return menuItems;
    }
    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="menu"
      className="py-20 bg-gradient-to-b from-amber-50 to-orange-50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-teal-900 mb-4">
            Our Menu
          </h2>
          <p className="text-lg text-teal-800/80 max-w-2xl mx-auto">
            Authentic Filipino dishes made with love and traditional recipes
          </p>
          <div className="w-24 h-1 bg-linear-to-r from-orange-500 via-teal-700 to-orange-500 mx-auto rounded-full mt-4" />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
                  activeCategory === category.id
                    ? "bg-linear-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                    : "bg-white/60 backdrop-blur-sm border-2 border-orange-500/30 text-orange-600 hover:border-orange-500 hover:bg-white/80"
                }`}
              >
                <Icon size={20} />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
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
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-bold text-teal-900 group-hover:text-orange-600 transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-2xl font-bold text-orange-600">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-teal-800/70 mb-4 leading-relaxed">
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
      `}</style>
    </section>
  );
}
