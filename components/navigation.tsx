"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = [
        "hero",
        "about",
        "menu",
        "specials",
        "soups",
        "desserts",
        "team",
        "gallery",
        "grocery",
        "contact",
      ];

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const offsetTop = section.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node) &&
        mobileMenuOpen
      ) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: "Home", href: "#hero", id: "hero" },
    { label: "About", href: "#about", id: "about" },
    { label: "Menu", href: "#menu", id: "menu" },
    { label: "Specials", href: "#specials", id: "specials" },
    { label: "Soups", href: "#soups", id: "soups" },
    { label: "Desserts", href: "#desserts", id: "desserts" },
    { label: "Team", href: "#team", id: "team" },
    { label: "Gallery", href: "#gallery", id: "gallery" },
    { label: "Grocery", href: "#grocery", id: "grocery" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#fcf5e3]/95 backdrop-blur-lg shadow-lg py-3"
          : "bg-transparent py-4 md:py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="hover:scale-105 transition-transform duration-300"
            aria-label="Home"
          >
            <img
              src="/images/logo.png"
              alt="P'lengke Logo"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain"
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`font-medium transition-all duration-300 hover:scale-110 relative group px-2 py-1 ${
                  activeSection === item.id
                    ? "text-[#fd5e02]"
                    : "text-[#023341] hover:text-[#fd5e02]"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-[#fd5e02] transition-all duration-300 ${
                    activeSection === item.id
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[#023341] hover:text-[#fd5e02] transition-colors p-2 z-50 relative"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-0 top-[73px] bg-[#fcf5e3]/98 backdrop-blur-lg transition-all duration-300 ease-in-out ${
            mobileMenuOpen
              ? "opacity-100 visible translate-x-0"
              : "opacity-0 invisible translate-x-full"
          }`}
        >
          <div className="flex flex-col gap-2 py-6 px-4 overflow-y-auto h-[calc(100vh-73px)]">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`font-medium transition-all duration-300 py-3 px-4 rounded-lg ${
                  activeSection === item.id
                    ? "text-[#fd5e02] bg-[#fd5e02]/10"
                    : "text-[#023341] hover:text-[#fd5e02] hover:bg-[#fd5e02]/5"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
