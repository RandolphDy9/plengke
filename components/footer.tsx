"use client";

import { Facebook, Instagram, Mail, Phone } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Mail, href: "mailto:info@plengke.com", label: "Email" },
  ];

  return (
    <footer className="relative bg-linear-to-br from-[#023341] via-[#034a5a] to-[#023341] text-white pt-16 pb-8 overflow-hidden">
      {/* Decorative wave */}
      {/* <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-current text-[#fcf5e3]">
          <path d="M0,0 Q300,60 600,30 T1200,0 L1200,120 L0,120 Z" />
        </svg>
      </div> */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="animate-on-scroll">
            <h3 className="text-3xl font-bold mb-4">P&apos;LENGKE</h3>
            <p className="text-[#fcf5e3]/90 leading-relaxed">
              Pamilihang Bayan ng Montreal - Your authentic Filipino market in
              the heart of Montreal.
            </p>
          </div>

          {/* Quick Links */}
          <div className="animate-on-scroll">
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "About", "Menu", "Gallery", "Grocery", "Contact"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-[#fcf5e3]/90 hover:text-white hover:translate-x-2 inline-block transition-all duration-300"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Hours */}
          <div className="animate-on-scroll">
            <h4 className="text-xl font-bold mb-4">Hours</h4>
            <div className="space-y-2 text-[#fcf5e3]/90">
              <p>Monday - Sunday</p>
              <p className="font-semibold text-white">10:00 AM - 10:00 PM</p>
            </div>
          </div>

          {/* Contact */}
          <div className="animate-on-scroll">
            <h4 className="text-xl font-bold mb-4">Contact</h4>
            <div className="space-y-3 text-[#fcf5e3]/90">
              <p>4693 Ave Vanhorne Montreal</p>
              <p>Montreal, QC H3W1H8</p>
              <a
                href="tel:514-991-2449"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone size={16} />
                514-991-2449
              </a>
              <a
                href="tel:514-379-6570"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone size={16} />
                514-379-6570
              </a>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-8 animate-on-scroll">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center hover:scale-110 hover:rotate-12 transition-all duration-300"
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>

        {/* Copyright */}
        <div className="text-center text-[#fcf5e3]/90 pt-8 border-t border-white/10 animate-on-scroll">
          <p>
            © {new Date().getFullYear()} P&apos;lengke. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
