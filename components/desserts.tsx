"use client";

export default function Desserts() {
  const desserts = [
    {
      image: "/images/dessert-1.jpg",
      alt: "Assorted Filipino desserts platter with bibingka, puto, and traditional sweets",
    },
    {
      image: "/images/dessert-2.jpg",
      alt: "Ube cake - purple yam dessert with P'lengke label",
    },
    {
      image: "/images/dessert-3.jpg",
      alt: "Mango or buko pie with golden custard filling",
    },
    {
      image: "/images/dessert-4.jpg",
      alt: "Leche flan - creamy caramel custard with P'lengke label",
    },
  ];

  return (
    <section
      id="desserts"
      className="py-20 bg-linear-to-br from-[#fcf5e3] via-white to-[#f5f0e0]"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold text-[#fd5e02] mb-4">
            Sweet Delights
          </h2>
          <p className="text-lg text-[#023341]/80 max-w-2xl mx-auto">
            Traditional Filipino desserts to complete your meal
          </p>
          <div className="w-24 h-1 bg-linear-to-r from-[#fd5e02] via-[#023341] to-[#fd5e02] mx-auto rounded-full mt-4" />
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
