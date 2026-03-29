"use client";

import PageHeader from "@/components/page-header";

type DessertItem = { image: string; alt: string };

const defaultDesserts: DessertItem[] = [
  { image: "/images/dessert-1.jpg", alt: "Assorted Filipino desserts platter with bibingka, puto, and traditional sweets" },
  { image: "/images/dessert-2.jpg", alt: "Ube cake - purple yam dessert with P\u2019lengke label" },
  { image: "/images/dessert-3.jpg", alt: "Mango or buko pie with golden custard filling" },
  { image: "/images/dessert-4.jpg", alt: "Leche flan - creamy caramel custard with P\u2019lengke label" },
];

type DessertsProps = {
  items?: DessertItem[];
  title?: string;
  subtitle?: string;
};

export default function Desserts({ items, title, subtitle }: DessertsProps) {
  const desserts = items && items.length > 0 ? items : defaultDesserts;

  return (
    <section id="desserts" className="py-20 bg-linear-to-br from-[#fcf5e3] via-white to-[#f5f0e0]">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <PageHeader
            title={title || "Sweet Delights"}
            subtitle={subtitle || "Traditional Filipino desserts to complete your meal"}
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {desserts.map((dessert, index) => (
            <div
              key={index}
              className="animate-on-scroll relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group aspect-square"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={dessert.image || "/placeholder.svg"}
                alt={dessert.alt}
                className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
