"use client";

export default function MenuSpecials() {
  const specials = [
    {
      title: "Tuesday Specials",
      image: "/images/menu-2.jpg",
      alt: "Tuesday menu featuring Menudo, Laing, Paksiw na Bangus, Kare-Kare, Binagoongan Sinigang, Chicken Curry, and Chicken Adobo",
    },
    {
      title: "Wednesday Specials",
      image: "/images/menu-3.jpg",
      alt: "Wednesday menu featuring Pusit, Monggo, Sinaing na Tulingan, Igado, Bicol Express, Tinola, Ginataang, Kalabasa/Sitaw, and Pork Adobo",
    },
    {
      title: "Friday Specials",
      image: "/images/menu-4.jpg",
      alt: "Friday menu featuring Pusit, Monggo, Sinaing na Tulingan, Igado, Bicol Express, Tinola, Ginataang, Kalabasa/Sitaw, and Pork Adobo",
    },
  ];

  return (
    <section
      id="specials"
      className="py-20 bg-linear-to-br from-[#fcf5e3] via-white to-[#f5f0e0]"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold text-[#fd5e02] mb-4">
            Weekly Specials
          </h2>
          <p className="text-lg text-[#023341]/80 max-w-2xl mx-auto">
            Fresh daily dishes and special offerings throughout the week
          </p>
          <div className="w-24 h-1 bg-linear-to-r from-[#fd5e02] via-[#023341] to-[#fd5e02] mx-auto rounded-full mt-4" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {specials.map((special, index) => (
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
                <h3 className="text-2xl font-bold text-[#fd5e02]">
                  {special.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
