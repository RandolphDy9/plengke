"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/hero";
import About from "@/components/about";
import Menu from "@/components/menu";
import MenuSpecials from "@/components/menu-specials";
import Soups from "@/components/soups";
import Desserts from "@/components/desserts";
import Team from "@/components/team";
import Gallery from "@/components/gallery";
import GroceryStore from "@/components/grocery-store";
import Contact from "@/components/contact";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import WallOfLoveSection from "@/components/testimonial";

export default function Home() {
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
    }, 2100);

    return () => {
      observer.disconnect();
    };
  }, []);

  // if (loading) {
  //   return <LoadingScreen />;
  // }

  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        {/* <Feature /> */}
        <Menu />
        <MenuSpecials />
        <Soups />
        <Desserts />
        <Gallery />
        <Team />
        <GroceryStore />
        <WallOfLoveSection />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
