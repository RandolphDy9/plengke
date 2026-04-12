import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Navigation from "@/components/navigation";
import GroceryStore from "@/components/grocery-store";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import ScrollAnimationHandler from "@/components/scroll-animation-handler";
import PageHeader from "@/components/page-header";
import HeritageBackground from "@/components/heritage-background";

export const revalidate = 10;

export default async function GroceryPage() {
  const [groceryItems, rawSiteSettings, pageHeader] = await Promise.all([
    client.fetch(`*[_type == "grocery"] | order(order asc, name asc) {
      _id, name, category, price, originalPrice, image, inStock, featured, order
    }`),
    client.fetch(`*[_type == "siteSettings"][0]{
      siteName, footerDescription, address1, address2,
      phone1, phone2, email, hoursDay, hoursTime
    }`),
    client.fetch(`*[_type == "pageContent" && pageId == "grocery"][0]{ title, subtitle }`),
  ]);

  const transformedItems = groceryItems.map((item: any) => ({
    id: item._id,
    name: item.name,
    category: item.category,
    price: item.price,
    originalPrice: item.originalPrice || undefined,
    image: item.image ? urlFor(item.image).width(400).height(400).url() : "/placeholder.svg",
    inStock: item.inStock ?? true,
    featured: item.featured ?? false,
  }));

  const title = pageHeader?.title || "Our Grocery Items";
  const subtitle = pageHeader?.subtitle || "Browse our selection of groceries and find the perfect items for your home.";

  return (
    <>
      <ScrollAnimationHandler />
      <Navigation />
      <HeritageBackground>
        <PageHeader title={title} subtitle={subtitle} />
        <GroceryStore initialItems={transformedItems} />
      </HeritageBackground>
      <Footer data={rawSiteSettings ?? undefined} />
      <ScrollToTop />
    </>
  );
}
