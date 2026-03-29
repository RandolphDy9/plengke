import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import HomeContent from "@/components/home-content";

export const revalidate = 10;

export default async function Home() {
  const [
    heroData,
    rawMenuItems,
    rawMenuSpecials,
    rawDesserts,
    rawTeamMembers,
    rawTestimonials,
    rawAbout,
    rawSiteSettings,
    menuPageHeader,
    specialsHeader,
    dessertsHeader,
    teamHeader,
    testimonialsHeader,
    contactHeader,
  ] = await Promise.all([
    client.fetch(`*[_type == "hero"][0]{
      badge, titlePrefix, titleHighlight, description,
      primaryButtonText, primaryButtonLink,
      secondaryButtonText, secondaryButtonLink,
      address, statusText, heroImage, floatingCard1, floatingCard2
    }`),
    client.fetch(`*[_type == "menuItem"] | order(order asc, name asc){
      _id, name, category, description, price, image
    }`),
    client.fetch(`*[_type == "menuSpecial"] | order(order asc){
      _id, title, image, alt
    }`),
    client.fetch(`*[_type == "dessert"] | order(order asc){
      _id, image, alt
    }`),
    client.fetch(`*[_type == "teamMember"] | order(order asc, name asc){
      _id, name, role, image, alt
    }`),
    client.fetch(`*[_type == "testimonial"] | order(order asc){
      _id, name, role, avatarUrl, quote
    }`),
    client.fetch(`*[_type == "about"][0]{
      paragraph1, paragraph2, backgroundImage, stats
    }`),
    client.fetch(`*[_type == "siteSettings"][0]{
      siteName, footerDescription, address1, address2,
      phone1, phone2, hoursDay, hoursTime, mapsUrl, mapImage
    }`),
    client.fetch(`*[_type == "pageContent" && pageId == "menu"][0]{ title, subtitle }`),
    client.fetch(`*[_type == "pageContent" && pageId == "section-specials"][0]{ title, subtitle }`),
    client.fetch(`*[_type == "pageContent" && pageId == "section-desserts"][0]{ title, subtitle }`),
    client.fetch(`*[_type == "pageContent" && pageId == "section-team"][0]{ title, subtitle }`),
    client.fetch(`*[_type == "pageContent" && pageId == "section-testimonials"][0]{ title, subtitle }`),
    client.fetch(`*[_type == "pageContent" && pageId == "section-contact"][0]{ title, subtitle }`),
  ]);

  const menuItems = rawMenuItems?.map((item: any) => ({
    name: item.name,
    category: item.category,
    description: item.description || "",
    price: item.price,
    image: item.image ? urlFor(item.image).width(600).height(400).url() : "/placeholder.svg",
  })) ?? [];

  const menuSpecials = rawMenuSpecials?.map((item: any) => ({
    title: item.title,
    image: item.image ? urlFor(item.image).width(800).url() : "/placeholder.svg",
    alt: item.alt || item.title,
  })) ?? [];

  const desserts = rawDesserts?.map((item: any) => ({
    image: item.image ? urlFor(item.image).width(600).height(600).url() : "/placeholder.svg",
    alt: item.alt || "",
  })) ?? [];

  const teamMembers = rawTeamMembers?.map((item: any) => ({
    name: item.name,
    role: item.role,
    image: item.image ? urlFor(item.image).width(400).height(533).url() : "/placeholder.svg",
    alt: item.alt || item.name,
  })) ?? [];

  const testimonials = rawTestimonials?.map((item: any) => ({
    name: item.name,
    role: item.role || "",
    image: item.avatarUrl || "",
    quote: item.quote,
  })) ?? [];

  const aboutData = rawAbout ? {
    paragraph1: rawAbout.paragraph1,
    paragraph2: rawAbout.paragraph2,
    backgroundImageUrl: rawAbout.backgroundImage
      ? urlFor(rawAbout.backgroundImage).width(1600).url()
      : undefined,
    stats: rawAbout.stats,
  } : undefined;

  const siteSettings = rawSiteSettings ? {
    siteName: rawSiteSettings.siteName,
    footerDescription: rawSiteSettings.footerDescription,
    address1: rawSiteSettings.address1,
    address2: rawSiteSettings.address2,
    phone1: rawSiteSettings.phone1,
    phone2: rawSiteSettings.phone2,
    hoursDay: rawSiteSettings.hoursDay,
    hoursTime: rawSiteSettings.hoursTime,
    mapsUrl: rawSiteSettings.mapsUrl,
    mapImageUrl: rawSiteSettings.mapImage
      ? urlFor(rawSiteSettings.mapImage).width(800).url()
      : undefined,
  } : undefined;

  return (
    <HomeContent
      heroData={heroData}
      menuItems={menuItems}
      menuSpecials={menuSpecials}
      desserts={desserts}
      teamMembers={teamMembers}
      testimonials={testimonials}
      aboutData={aboutData}
      siteSettings={siteSettings}
      menuTitle={menuPageHeader?.title}
      menuSubtitle={menuPageHeader?.subtitle}
      specialsTitle={specialsHeader?.title}
      specialsSubtitle={specialsHeader?.subtitle}
      dessertsTitle={dessertsHeader?.title}
      dessertsSubtitle={dessertsHeader?.subtitle}
      teamTitle={teamHeader?.title}
      teamSubtitle={teamHeader?.subtitle}
      testimonialsTitle={testimonialsHeader?.title}
      testimonialsSubtitle={testimonialsHeader?.subtitle}
      contactTitle={contactHeader?.title}
      contactSubtitle={contactHeader?.subtitle}
    />
  );
}
