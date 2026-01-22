"use client";

import { useEffect } from "react";
import Navigation from "@/components/navigation";
import Menu from "@/components/menu";
import MenuSpecials from "@/components/menu-specials";
import Soups from "@/components/soups";
import Desserts from "@/components/desserts";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";

export default function LamesaPage() {
  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all elements with animate-on-scroll class
    setTimeout(() => {
      const elements = document.querySelectorAll(".animate-on-scroll");
      elements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Navigation />
      <main>
        <Menu />
        <MenuSpecials />
        <Soups />
        <Desserts />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
