"use client";

import PageHeader from "@/components/page-header";

type Special = { title: string; image: string; alt: string };

const defaultSpecials: Special[] = [
  { title: "Tuesday Specials", image: "/images/menu-2.jpg", alt: "Tuesday menu featuring Menudo, Laing, Paksiw na Bangus, Kare-Kare, Binagoongan Sinigang, Chicken Curry, and Chicken Adobo" },
  { title: "Wednesday Specials", image: "/images/menu-3.jpg", alt: "Wednesday menu featuring Pusit, Monggo, Sinaing na Tulingan, Igado, Bicol Express, Tinola, Ginataang, Kalabasa/Sitaw, and Pork Adobo" },
  { title: "Friday Specials", image: "/images/menu-4.jpg", alt: "Friday menu featuring Pusit, Monggo, Sinaing na Tulingan, Igado, Bicol Express, Tinola, Ginataang, Kalabasa/Sitaw, and Pork Adobo" },
];

type MenuSpecialsProps = {
  specials?: Special[];
  title?: string;
  subtitle?: string;
};

export default function MenuSpecials({ specials, title, subtitle }: MenuSpecialsProps) {
  const items = specials && specials.length > 0 ? specials : defaultSpecials;

  return (
    <section id="specials" className="py-20 bg-linear-to-br from-[#fcf5e3] via-white to-[#f5f0e0]">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <PageHeader
            title={title || "Weekly Specials"}
            subtitle={subtitle || "Fresh daily dishes and special offerings throughout the week"}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {items.map((special, index) => (
            <div
              key={index}
              className="animate-on-scroll glass rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={special.image || "/placeholder.svg"}
                  alt={special.alt}
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-[#fd5e02]">{special.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
