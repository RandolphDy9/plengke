"use client";

export default function Soups() {
  return (
    <section id="soups" className="py-20 bg-[#fcf5e3]/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold text-[#fd5e02] mb-4">
            Delicious P'lengke Soup
          </h2>
          <p className="text-lg text-[#023341]/80 max-w-2xl mx-auto">
            Traditional Filipino soups made with authentic ingredients and
            time-honored recipes
          </p>
          <div className="w-24 h-1 bg-linear-to-r from-[#fd5e02] via-[#023341] to-[#fd5e02] mx-auto rounded-full mt-4" />
        </div>

        <div className="max-w-5xl mx-auto animate-on-scroll">
          <div className="glass rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
            <img
              src="/images/menu-1.jpg"
              alt="P'lengke soup menu featuring Lomi $15, Mami $15, Bulalo $20, Tahong $18, and Sinuam $18 with choice of Patola, Mais or Upo"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
