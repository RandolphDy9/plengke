"use client";

import { useEffect } from "react";
import Hero from "@/components/hero";
import About from "@/components/about";
import Menu from "@/components/menu";
import MenuSpecials from "@/components/menu-specials";
import Soups from "@/components/soups";
import Desserts from "@/components/desserts";
import Team from "@/components/team";
import Gallery from "@/components/gallery";
import Contact from "@/components/contact";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import WallOfLoveSection from "@/components/testimonial";
import type { Image } from "sanity";

interface FloatingCard {
  emoji?: string;
  label?: string;
  title?: string;
}

interface HeroData {
  badge?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  address?: string;
  statusText?: string;
  heroImage?: Image;
  floatingCard1?: FloatingCard;
  floatingCard2?: FloatingCard;
}

interface HomeContentProps {
  heroData?: HeroData;
}

export default function HomeContent({ heroData }: HomeContentProps) {
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

  return (
    <>
      <Navigation />
      <main>
        <Hero {...heroData} />
        <About />
        <Menu />
        <MenuSpecials />
        <Soups />
        <Desserts />
        <Gallery />
        <Team />
        <WallOfLoveSection />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
