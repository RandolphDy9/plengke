"use client";

import { MapPin, Phone, Clock } from "lucide-react";
import PageHeader from "@/components/page-header";

type ContactData = {
  address1?: string;
  address2?: string;
  phone1?: string;
  phone2?: string;
  hoursDay?: string;
  hoursTime?: string;
  mapsUrl?: string;
  mapImageUrl?: string;
};

type ContactProps = {
  data?: ContactData;
  title?: string;
  subtitle?: string;
};

const defaults: Required<ContactData> = {
  address1: "4693 Ave Vanhorne Montreal",
  address2: "Montreal, QC H3W1H8",
  phone1: "514-991-2449",
  phone2: "514-379-6570",
  hoursDay: "Monday - Sunday",
  hoursTime: "10:00 AM - 10:00 PM",
  mapsUrl:
    "https://www.google.com/maps/place/PLENGKE+(Ang+Pamilihang+Bayan+ng+Montreal)/@45.4948735,-73.6372075,15.53z/data=!4m6!3m5!1s0x4cc919ba2f1c48ed:0xb64ac7d357baf109!8m2!3d45.4954403!4d-73.6370702!16s%2Fg%2F11jm9nn5hw?entry=ttu&g_ep=EgoyMDI2MDEwNy4wIKXMDSoASAFQAw%3D%3D",
  mapImageUrl: "/images/map.png",
};

export default function Contact({ data, title, subtitle }: ContactProps) {
  const d = { ...defaults, ...data };

  return (
    <section
      id="contact"
      className="py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <PageHeader
            title={title || "Visit Us"}
            subtitle={subtitle || "Come experience authentic Filipino hospitality"}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="animate-on-scroll h-full flex">
            <div className="glass rounded-3xl p-8 hover:shadow-xl transition-all duration-300 w-full h-full flex flex-col">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-linear-to-br from-[var(--primary)] to-[var(--foreground)] rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">Location</h3>
                  <p className="text-[var(--foreground)]/80 leading-relaxed">
                    {d.address1}
                    <br />
                    {d.address2}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-linear-to-br from-[var(--primary)] to-[var(--foreground)] rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">Phone</h3>
                  <p className="text-[var(--foreground)]/80">
                    {d.phone1 && (
                      <a href={`tel:${d.phone1}`} className="hover:text-[var(--primary)] transition-colors block">
                        {d.phone1}
                      </a>
                    )}
                    {d.phone2 && (
                      <a href={`tel:${d.phone2}`} className="hover:text-[var(--primary)] transition-colors block">
                        {d.phone2}
                      </a>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-linear-to-br from-[var(--primary)] to-[var(--foreground)] rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">Hours</h3>
                  <p className="text-[var(--foreground)]/80 leading-relaxed">
                    {d.hoursDay}
                    <br />
                    {d.hoursTime}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="animate-on-scroll h-full flex">
            <a
              href={d.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block glass rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 group w-full h-full"
            >
              <div className="relative h-full">
                <img
                  src={d.mapImageUrl || "/images/map.png"}
                  alt="P'lengke Location Map"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-bold text-lg bg-[var(--primary)] px-6 py-3 rounded-full">
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
