"use client";

import { Package, Leaf, Fish, IceCream } from "lucide-react";

export default function GroceryStore() {
  const categories = [
    {
      icon: Package,
      name: "Pantry Staples",
      description: "Rice, noodles, sauces, and cooking essentials",
      items: ["Jasmine Rice", "Pancit Canton", "Bagoong", "Banana Ketchup"],
    },
    {
      icon: Leaf,
      name: "Fresh Produce",
      description: "Tropical fruits and vegetables",
      items: ["Ube", "Calamansi", "Kangkong", "Green Papaya"],
    },
    {
      icon: Fish,
      name: "Meat & Seafood",
      description: "Fresh and frozen options",
      items: ["Milkfish", "Pork Belly", "Chicken", "Shrimp"],
    },
    {
      icon: IceCream,
      name: "Frozen Treats",
      description: "Ice cream, desserts, and more",
      items: ["Ube Ice Cream", "Halo-Halo Mix", "Lumpia", "Spring Rolls"],
    },
  ];

  return (
    <section
      id="grocery"
      className="py-20 bg-linear-to-br from-[#fcf5e3] via-white to-[#f5f0e0]"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold text-[#fd5e02] mb-4">
            Grocery Store
          </h2>
          <p className="text-lg text-[#023341]/80 max-w-2xl mx-auto">
            Everything you need to cook authentic Filipino dishes at home
          </p>
          <div className="w-24 h-1 bg-linear-to-r from-[#fd5e02] via-[#023341] to-[#fd5e02] mx-auto rounded-full mt-4" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="animate-on-scroll glass rounded-3xl p-6 hover:shadow-2xl transition-all duration-500 hover:scale-105 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-[#fd5e02] to-[#fcf5e3] border-2 border-[#023341] rounded-2xl mb-4 group-hover:rotate-12 transition-transform duration-300">
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-[#023341] mb-2 group-hover:text-[#fd5e02] transition-colors">
                  {category.name}
                </h3>
                <p className="text-[#023341]/80 mb-4 text-sm leading-relaxed">
                  {category.description}
                </p>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-sm text-[#023341]/80 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-[#fd5e02] rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12 animate-on-scroll">
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Visit Our Store
          </a>
        </div>
      </div>
    </section>
  );
}
