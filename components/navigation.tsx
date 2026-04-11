"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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

  const navItems = [
    { label: "Home", href: "/", id: "home" },
    { label: "Karenderya", href: "/menu", id: "menu" },
    { label: "Grocery", href: "/grocery", id: "grocery" },
    { label: "Lamesa", href: "/lamesa", id: "lamesa" },
    { label: "Filipiniana at IBP", href: "/filipiniana", id: "filipiniana" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(href);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--background)]/95 shadow-lg py-2"
          : pathname === "/filipiniana"
            ? "bg-transparent py-4 md:py-6"
            : "bg-[var(--background)]/95 lg:bg-transparent py-4 md:py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between relative">
          {/* Logo - Aligned Left for better balance */}
          <Link
            href="/"
            className="hover:scale-105 transition-transform duration-300 z-20 shrink-0"
            aria-label="Home"
          >
            <div className={`bg-[#FDFDFD] rounded-full shadow-xl flex items-center justify-center aspect-square transition-all duration-500 border border-gray-300 ${
              scrolled ? "w-16 md:w-20" : "w-18 md:w-24"
            }`}>
              <img
                src="/images/logo.png"
                alt="P'lengke Logo"
                className="w-full h-auto object-contain p-1"
              />
            </div>
          </Link>

          {/* Desktop Navigation - Aligned Right */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-12">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`font-black uppercase tracking-[0.15em] text-lg xl:text-xl transition-all duration-300 hover:scale-105 relative group px-2 py-1 ${
                    active ? "text-primary" : "text-secondary hover:text-primary"
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-primary transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button - Traditional Right Placement */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-secondary hover:text-primary transition-colors p-2 z-50"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-0 bg-[var(--background)] backdrop-blur-lg transition-all duration-300 ease-in-out ${
            mobileMenuOpen
              ? "opacity-100 visible translate-x-0"
              : "opacity-0 invisible translate-x-full"
          }`}
          style={{ top: scrolled ? "73px" : "88px" }}
        >
          <div className="flex flex-col gap-4 py-6 px-4 overflow-y-auto h-[calc(100vh-73px)]">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-black uppercase tracking-[0.1em] text-xl transition-all duration-300 py-4 px-4 rounded-lg ${
                    active
                      ? "text-[var(--primary)] bg-[var(--primary)]/10"
                      : "text-[var(--foreground)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
