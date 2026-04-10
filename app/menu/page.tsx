import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Navigation from "@/components/navigation";
import Menu from "@/components/menu";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import ScrollAnimationHandler from "@/components/scroll-animation-handler";
import PageHeader from "@/components/page-header";

export const revalidate = 10;

export default async function MenuPage() {
  const [rawMenuItems, rawSiteSettings, pageHeader] = await Promise.all([
    client.fetch(`*[_type == "menuItem"] | order(order asc, name asc){
      _id, name, category, description, price, image
    }`),
    client.fetch(`*[_type == "siteSettings"][0]{
      siteName, footerDescription, address1, address2,
      phone1, phone2, hoursDay, hoursTime
    }`),
    client.fetch(`*[_type == "pageContent" && pageId == "menu"][0]{ title, subtitle }`),
  ]);

  const menuItems = rawMenuItems?.map((item: any) => ({
    name: item.name,
    category: item.category,
    description: item.description || "",
    price: item.price,
    image: item.image ? urlFor(item.image).width(1200).url() : "/placeholder.svg",
  })) ?? [];

  const title = pageHeader?.title || "Our Menu";
  const subtitle = pageHeader?.subtitle || "Authentic Filipino dishes made with love and traditional recipes";

  return (
    <>
      <ScrollAnimationHandler />
      <Navigation />
      <main className="mt-48 mb-20">
        <PageHeader title={title} subtitle={subtitle} />
        <Menu initialItems={menuItems} />
      </main>
      <Footer data={rawSiteSettings ?? undefined} />
      <ScrollToTop />
    </>
  );
}
