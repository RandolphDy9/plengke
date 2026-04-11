import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Navigation from "@/components/navigation";
import Filipiniana from "@/components/filipiniana";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import ScrollAnimationHandler from "@/components/scroll-animation-handler";

export const revalidate = 10;

export default async function FilipianianaPage() {
  const [rawItems, rawSiteSettings, pageHeader] = await Promise.all([
    client.fetch(`*[_type == "filipinianaItem"] | order(order asc, name asc) {
      _id, name, category, description, price, originalPrice, image, inStock, featured, order
    }`),
    client.fetch(`*[_type == "siteSettings"][0]{
      siteName, footerDescription, address1, address2,
      phone1, phone2, email, hoursDay, hoursTime
    }`),
    client.fetch(`*[_type == "pageContent" && pageId == "filipiniana"][0]{
      title, subtitle, eyebrowLabel, badgeLabel, cardOverlayText, emptyStateText, soldOutText,
      card1Title, card1Description, card2Title, card2Description, card3Title, card3Description
    }`),
  ]);

  const items = (rawItems ?? []).map((item: any) => ({
    id: item._id,
    name: item.name,
    category: item.category,
    description: item.description || "",
    price: item.price,
    originalPrice: item.originalPrice || undefined,
    image: item.image ? urlFor(item.image).width(800).url() : "/placeholder.svg",
    inStock: item.inStock ?? true,
    featured: item.featured ?? false,
  }));

  const content = {
    title: pageHeader?.title || "Filipiniana at IBP",
    subtitle: pageHeader?.subtitle || "A curated sanctuary of authentic Filipino treasures. From artisanal apparel to handcrafted souvenirs, every piece tells a story of our vibrant islands.",
    eyebrowLabel: pageHeader?.eyebrowLabel || "Luzon Harvest Heritage",
    badgeLabel: pageHeader?.badgeLabel || "Heritage",
    cardOverlayText: pageHeader?.cardOverlayText || "View Heritage Details",
    emptyStateText: pageHeader?.emptyStateText || "Mga gamit ay kasalukuyang wala...",
    soldOutText: pageHeader?.soldOutText || "Sold Out",
    card1Title: pageHeader?.card1Title || "Kasuotan",
    card1Description: pageHeader?.card1Description || "Hand-woven apparel and contemporary Filipiniana that honor our weaving traditions—from the intricate Inabel patterns to modern Barong silhouettes.",
    card2Title: pageHeader?.card2Title || "Alaala",
    card2Description: pageHeader?.card2Description || "Curated souvenirs and artisanal handicrafts that capture the spirit of the Philippine archipelago, crafted by local masters and heritage workshops.",
    card3Title: pageHeader?.card3Title || "At Iba Pa",
    card3Description: pageHeader?.card3Description || "A collection of various treasures—from lifestyle accents to regional delicacies—that complete the authentic Filipino home and spirit.",
  };

  return (
    <>
      <ScrollAnimationHandler />
      <Navigation />
      <main className="-mb-20 pb-20">
        <Filipiniana initialItems={items} content={content} />
      </main>
      <Footer data={rawSiteSettings ?? undefined} />
      <ScrollToTop />
    </>
  );
}
