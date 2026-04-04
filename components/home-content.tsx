"use client";

import { useEffect } from "react";
import Hero from "@/components/hero";
import About from "@/components/about";
import Menu from "@/components/menu";
import MenuSpecials from "@/components/menu-specials";
import Desserts from "@/components/desserts";
import Team from "@/components/team";
import Contact from "@/components/contact";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import WallOfLoveSection from "@/components/testimonial";
import Announcements from "@/components/announcements";
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

interface MenuItem {
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
}

interface MenuSpecial {
  title: string;
  image: string;
  alt: string;
}

interface DessertItem {
  image: string;
  alt: string;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
  alt: string;
}

interface AnnouncementItem {
  title: string;
  badge?: string;
  description?: string;
  image: string;
  alt?: string;
  buttonText?: string;
  buttonLink?: string;
}

interface Testimonial {
  name: string;
  role: string;
  image: string;
  quote: string;
}

interface AboutData {
  paragraph1?: string;
  paragraph2?: string;
  backgroundImageUrl?: string;
  stats?: { value: string; label: string }[];
}

interface SiteSettingsData {
  siteName?: string;
  footerDescription?: string;
  address1?: string;
  address2?: string;
  phone1?: string;
  phone2?: string;
  hoursDay?: string;
  hoursTime?: string;
  mapsUrl?: string;
  mapImageUrl?: string;
}

interface HomeContentProps {
  heroData?: HeroData;
  announcements?: AnnouncementItem[];
  announcementsTitle?: string;
  announcementsSubtitle?: string;
  menuItems?: MenuItem[];
  menuSpecials?: MenuSpecial[];
  desserts?: DessertItem[];
  teamMembers?: TeamMember[];
  testimonials?: Testimonial[];
  aboutData?: AboutData;
  siteSettings?: SiteSettingsData;
  menuTitle?: string;
  menuSubtitle?: string;
  specialsTitle?: string;
  specialsSubtitle?: string;
  dessertsTitle?: string;
  dessertsSubtitle?: string;
  teamTitle?: string;
  teamSubtitle?: string;
  testimonialsTitle?: string;
  testimonialsSubtitle?: string;
  contactTitle?: string;
  contactSubtitle?: string;
}

export default function HomeContent({
  heroData,
  announcements,
  announcementsTitle,
  announcementsSubtitle,
  menuItems,
  menuSpecials,
  desserts,
  teamMembers,
  testimonials,
  aboutData,
  siteSettings,
  menuTitle,
  menuSubtitle,
  specialsTitle,
  specialsSubtitle,
  dessertsTitle,
  dessertsSubtitle,
  teamTitle,
  teamSubtitle,
  testimonialsTitle,
  testimonialsSubtitle,
  contactTitle,
  contactSubtitle,
}: HomeContentProps) {
  useEffect(() => {
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
        <Announcements items={announcements} title={announcementsTitle} subtitle={announcementsSubtitle} />
        <About data={aboutData} />
        <Menu
          initialItems={menuItems}
          title={menuTitle}
          subtitle={menuSubtitle}
        />
        <MenuSpecials specials={menuSpecials} title={specialsTitle} subtitle={specialsSubtitle} />
        <Desserts items={desserts} title={dessertsTitle} subtitle={dessertsSubtitle} />
        <Team members={teamMembers} title={teamTitle} subtitle={teamSubtitle} />
        <WallOfLoveSection testimonials={testimonials} title={testimonialsTitle} subtitle={testimonialsSubtitle} />
        <Contact data={siteSettings} title={contactTitle} subtitle={contactSubtitle} />
      </main>
      <Footer data={siteSettings} />
      <ScrollToTop />
    </>
  );
}
