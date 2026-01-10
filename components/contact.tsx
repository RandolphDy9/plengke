"use client";
import { MapPin, Phone, Clock } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-20 bg-linear-to-br from-[#fcf5e3] via-white to-[#f5f0e0]"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold text-[#fd5e02] mb-4">
            Visit Us
          </h2>
          <p className="text-lg text-[#023341]/80 max-w-2xl mx-auto">
            Come experience authentic Filipino hospitality
          </p>
          <div className="w-24 h-1 bg-linear-to-r from-[#fd5e02] via-[#023341] to-[#fd5e02] mx-auto rounded-full mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="animate-on-scroll h-full flex">
            <div className="glass rounded-3xl p-8 hover:shadow-xl transition-all duration-300 w-full h-full flex flex-col">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-linear-to-br from-[#fd5e02] to-[#023341] rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#023341] mb-2">
                    Location
                  </h3>
                  <p className="text-[#023341]/80 leading-relaxed">
                    4693 Ave Vanhorne Montreal
                    <br />
                    Montreal, QC H3W1H8
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-linear-to-br from-[#fd5e02] to-[#023341] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#023341] mb-2">
                    Phone
                  </h3>
                  <p className="text-[#023341]/80">
                    <a
                      href="tel:514-991-2449"
                      className="hover:text-[#fd5e02] transition-colors block"
                    >
                      514-991-2449
                    </a>
                    <a
                      href="tel:514-379-6570"
                      className="hover:text-[#fd5e02] transition-colors block"
                    >
                      514-379-6570
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-linear-to-br from-[#fd5e02] to-[#023341] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#023341] mb-2">
                    Hours
                  </h3>
                  <p className="text-[#023341]/80 leading-relaxed">
                    Monday - Sunday
                    <br />
                    10:00 AM - 10:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="animate-on-scroll h-full flex">
            <a
              href="https://www.google.com/maps/place/PLENGKE+(Ang+Pamilihang+Bayan+ng+Montreal)/@45.4948735,-73.6372075,15.53z/data=!4m6!3m5!1s0x4cc919ba2f1c48ed:0xb64ac7d357baf109!8m2!3d45.4954403!4d-73.6370702!16s%2Fg%2F11jm9nn5hw?entry=ttu&g_ep=EgoyMDI2MDEwNy4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="block glass rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 group w-full h-full"
            >
              <div className="relative h-full">
                <img
                  src="/images/map.png"
                  alt="P'lengke Location Map"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-bold text-lg bg-[#fd5e02] px-6 py-3 rounded-full">
                    View on Google Maps
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
