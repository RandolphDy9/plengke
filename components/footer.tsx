"use client";

import { Phone } from "lucide-react";

type SiteSettingsData = {
  siteName?: string;
  footerDescription?: string;
  address1?: string;
  address2?: string;
  phone1?: string;
  phone2?: string;
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
  const hoursDay = data?.hoursDay || "Monday - Sunday";
  const hoursTime = data?.hoursTime || "10:00 AM - 10:00 PM";

  return (
    <footer className="relative bg-linear-to-br from-[#023341] via-[#034a5a] to-[#023341] text-white pt-16 pb-8 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div className="animate-on-scroll">
            <h3 className="text-3xl font-bold mb-4">{siteName}</h3>
            <p className="text-[#fcf5e3]/90 leading-relaxed">{footerDescription}</p>
          </div>

          {/* Hours */}
          <div className="animate-on-scroll">
            <h4 className="text-xl font-bold mb-4">Hours</h4>
            <div className="space-y-2 text-[#fcf5e3]/90">
              <p>{hoursDay}</p>
              <p className="font-semibold text-white">{hoursTime}</p>
            </div>
          </div>

          {/* Contact */}
          <div className="animate-on-scroll">
            <h4 className="text-xl font-bold mb-4">Contact</h4>
            <div className="space-y-3 text-[#fcf5e3]/90">
              <p>{address1}</p>
              <p>{address2}</p>
              {phone1 && (
                <a href={`tel:${phone1}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone size={16} />
                  {phone1}
                </a>
              )}
              {phone2 && (
                <a href={`tel:${phone2}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone size={16} />
                  {phone2}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-[#fcf5e3]/90 pt-8 border-t border-white/10 animate-on-scroll flex justify-between">
          <p>&copy; {new Date().getFullYear()} P&apos;lengke. All rights reserved.</p>
          <p>Built by <a href="https://randolphdy.com" target="_blank" rel="noopener noreferrer">Randolph Dy</a></p>
        </div>
      </div>
    </footer>
  );
}
