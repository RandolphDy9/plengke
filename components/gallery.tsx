"use client";

export default function Gallery() {
  const images = [
    {
      src: "/images/food-1.jpg",
      alt: "Bulalo",
    },
    {
      src: "/images/food-2.jpg",
      alt: "Shredded Chicken",
    },
    {
      src: "/images/food-3.jpg",
      alt: "Spicy Beef",
    },
    {
      src: "/images/food-4.jpg",
      alt: "BBQ Skewers",
    },
    {
      src: "/images/food-5.jpg",
      alt: "Bistek",
    },
    {
      src: "/images/food-6.jpg",
      alt: "Kare-Kare",
    },
  ];

  return (
    <section id="gallery" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold text-[#fd5e02] mb-4">
            Gallery
          </h2>
          <p className="text-lg text-[#023341]/80 max-w-2xl mx-auto">
            A visual journey through our delicious Filipino cuisine
          </p>
          <div className="w-24 h-1 bg-linear-to-r from-[#fd5e02] via-[#023341] to-[#fd5e02] mx-auto rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="animate-on-scroll relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group aspect-square"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <h3 className="text-white text-xl font-bold">{image.alt}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
