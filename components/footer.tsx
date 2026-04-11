"use client";

import { Phone, Mail } from "lucide-react";

type SiteSettingsData = {
  siteName?: string;
  footerDescription?: string;
  address1?: string;
  address2?: string;
  phone1?: string;
  phone2?: string;
  email?: string;
  hoursDay?: string;
  hoursTime?: string;
};

export default function Footer({ data }: { data?: SiteSettingsData }) {
  const siteName = data?.siteName || "P\u2019LENGKE";
  const footerDescription =
    data?.footerDescription ||
    "Pamilihang Bayan ng Montreal - Your authentic Filipino market in the heart of Montreal.";
  const address1 = data?.address1 || "4693 Ave Vanhorne Montreal";
  const address2 = data?.address2 || "Montreal, QC H3W1H8";
  const phone1 = data?.phone1 || "514-991-2449";
  const phone2 = data?.phone2 || "514-379-6570";
  const email = data?.email || "";
  const hoursDay = data?.hoursDay || "Monday - Sunday";
  const hoursTime = data?.hoursTime || "10:00 AM - 10:00 PM";

  return (
    <footer className="relative bg-accent text-[#9a1010] pt-20 pb-12 overflow-hidden border-t-8 border-primary">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div className="animate-on-scroll">
            <h3 className="text-4xl font-black mb-6 tracking-tighter uppercase italic">{siteName}</h3>
            <p className="font-bold leading-tight opacity-80 uppercase text-xs tracking-widest">{footerDescription}</p>
          </div>

          {/* Hours */}
          <div className="animate-on-scroll">
            <h4 className="text-xl font-black mb-6 uppercase tracking-widest border-b-2 border-[#9a1010] inline-block">Hours</h4>
            <div className="space-y-2 font-bold uppercase text-sm tracking-wide">
              <p>{hoursDay}</p>
              <p className="text-2xl font-black">{hoursTime}</p>
            </div>
          </div>

          {/* Contact */}
          <div className="animate-on-scroll">
            <h4 className="text-xl font-black mb-6 uppercase tracking-widest border-b-2 border-[#9a1010] inline-block">Contact</h4>
            <div className="space-y-4 font-bold uppercase text-sm tracking-wide">
              <p>{address1}<br />{address2}</p>
              <div className="flex flex-col gap-2">
                {phone1 && (
                  <a href={`tel:${phone1}`} className="flex items-center gap-2 hover:translate-x-2 transition-transform">
                    <Phone size={18} strokeWidth={3} />
                    {phone1}
                  </a>
                )}
                {phone2 && (
                  <a href={`tel:${phone2}`} className="flex items-center gap-2 hover:translate-x-2 transition-transform">
                    <Phone size={18} strokeWidth={3} />
                    {phone2}
                  </a>
                )}
                {email && (
                  <a href={`mailto:${email}`} className="flex items-center gap-2 hover:translate-x-2 transition-transform">
                    <Mail size={18} strokeWidth={3} />
                    {email}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-[10px] font-black uppercase tracking-[0.2em] pt-8 border-t-2 border-[#9a1010]/20 animate-on-scroll flex flex-col md:flex-row justify-between gap-4 opacity-70">
          <p>&copy; {new Date().getFullYear()} P&apos;lengke. All rights reserved.</p>
          <p>Built with ❤️ by <a href="https://randolphdy.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Randolph Dy</a></p>
        </div>
      </div>
    </footer>
  );
}
