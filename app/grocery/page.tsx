"use client";

import { useEffect } from "react";
import Navigation from "@/components/navigation";
import GroceryStore from "@/components/grocery-store";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";

export default function GroceryPage() {
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
        <GroceryStore />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
