import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Navigation from "@/components/navigation";
import GroceryStore from "@/components/grocery-store";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import ScrollAnimationHandler from "@/components/scroll-animation-handler";

// ISR: Revalidate every 10 seconds (adjust as needed)
export const revalidate = 10;

async function getGroceryItems() {
  const query = `*[_type == "grocery"] | order(order asc, name asc) {
    _id,
    name,
    category,
    price,
    originalPrice,
    image,
    inStock,
    featured,
    order
  }`;

  return client.fetch(query);
}

export default async function GroceryPage() {
  const groceryItems = await getGroceryItems();

  // Transform Sanity data to match component expectations
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

  return (
    <>
      <ScrollAnimationHandler />
      <Navigation />
      <main className="mt-32 mb-20">
        <div className="text-center container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-teal-900 mb-4">
            Our Grocery Items
          </h2>
          <p className="text-lg text-teal-800/80 max-w-2xl mx-auto">
            Browse our selection of groceries and find the perfect items for your home.
          </p>
          <div className="w-24 h-1 bg-linear-to-r from-orange-500 via-teal-700 to-orange-500 mx-auto rounded-full mt-4" />
        </div>
        <GroceryStore initialItems={transformedItems} />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
