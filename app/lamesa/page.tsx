import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import ScrollAnimationHandler from "@/components/scroll-animation-handler";
import PageHeader from "@/components/page-header";
import LamesaGallery from "@/components/lamesa-gallery";

export const revalidate = 10;

const SIZE_MAP: Record<string, string> = {
  large: "row-span-2 col-span-2",
  small: "row-span-1 col-span-1",
};

const defaultWorks = [
  { id: 1, title: "Artisanal Brew", category: "Branding Seals", image: "/images/menu-1.jpg", span: "row-span-2 col-span-2" },
  { id: 2, title: "Coffee Sleeve", category: "Photography", image: "/images/menu-2.jpg", span: "row-span-1 col-span-1" },
  { id: 3, title: "Packaging Design", category: "Web Design", image: "/images/food-1.jpg", span: "row-span-1 col-span-1" },
  { id: 4, title: "Breakfast Tray", category: "True Perfection", image: "/images/food-2.jpg", span: "row-span-1 col-span-1" },
  { id: 5, title: "Pink Stationery", category: "Photography", image: "/images/food-3.jpg", span: "row-span-1 col-span-1" },
  { id: 6, title: "Coffee Sleeve", category: "Photography", image: "/images/menu-2.jpg", span: "row-span-1 col-span-1" },
  { id: 7, title: "Packaging Design", category: "Web Design", image: "/images/food-1.jpg", span: "row-span-1 col-span-1" },
  { id: 8, title: "Breakfast Tray", category: "True Perfection", image: "/images/food-2.jpg", span: "row-span-1 col-span-1" },
  { id: 9, title: "Pink Stationery", category: "Photography", image: "/images/food-3.jpg", span: "row-span-1 col-span-1" },
];

export default async function LamesaPage() {
  const [rawItems, rawSiteSettings, pageHeader] = await Promise.all([
    client.fetch(`*[_type == "lamesaItem"] | order(order asc, title asc){
      _id, title, category, image, size
    }`),
    client.fetch(`*[_type == "siteSettings"][0]{
      siteName, footerDescription, address1, address2,
      phone1, phone2, email, hoursDay, hoursTime
    }`),
    client.fetch(`*[_type == "pageContent" && pageId == "lamesa"][0]{ title, subtitle, body, bodySubtext, bodyImage }`),
  ]);

  const works =
    rawItems && rawItems.length > 0
      ? rawItems.map((item: any, index: number) => ({
          id: index,
          title: item.title,
          category: item.category || "",
          image: item.image
            ? urlFor(item.image).width(800).url()
            : "/placeholder.svg",
          span: SIZE_MAP[item.size] || "row-span-1 col-span-1",
        }))
      : defaultWorks;

  return (
    <>
      <ScrollAnimationHandler />
      <Navigation />
      <main className="mt-48 mb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-12">
            <PageHeader
              title={pageHeader?.title || "Lamesa"}
              subtitle={pageHeader?.subtitle || "A curated gallery of P'Lengke's finest dishes and moments."}
            />
          </div>

          {/* About Lamesa */}
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 mb-20 animate-on-scroll">
            {/* Text */}
            <div className="flex-1 space-y-5 text-left">
              <p className="text-[var(--foreground)] text-base md:text-lg leading-relaxed whitespace-pre-line">
                {pageHeader?.body ||
                  "Lamesa — meaning 'table' in Filipino — is P'Lengke's way of bringing people together through food. It's more than a dining experience; it's a celebration of Filipino culture, flavors, and the warmth of sharing a meal with loved ones. Every dish on our table is crafted with heart, using traditional recipes passed down through generations."}
              </p>
              <p className="text-[var(--foreground)]/60 text-sm md:text-base leading-relaxed whitespace-pre-line">
                {pageHeader?.bodySubtext ||
                  "Browse through our gallery and get a taste of what awaits you. From festive gatherings to everyday ulam, Lamesa is your seat at the Filipino table — right here in Montreal."}
              </p>
            </div>
            {/* Image */}
            <div className="flex-1 w-full">
              <img
                src={
                  pageHeader?.bodyImage
                    ? urlFor(pageHeader.bodyImage).width(800).height(600).url()
                    : "/images/hero-image.jpg"
                }
                alt="About Lamesa"
                className="w-full h-72 md:h-96 object-cover rounded-3xl shadow-lg"
              />
            </div>
          </div>

          {/* Interactive Slider Gallery */}
          <div className="mb-24 px-4 md:px-12">
            <LamesaGallery items={works} />
          </div>
        </div>
      </main>
      <Footer data={rawSiteSettings ?? undefined} />
      <ScrollToTop />
    </>
  );
}
