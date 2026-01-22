import { client } from "@/sanity/lib/client";
import HomeContent from "@/components/home-content";

// ISR: Revalidate every 10 seconds (adjust as needed)
export const revalidate = 10;

async function getHeroData() {
  const query = `*[_type == "hero"][0]{
    badge,
    titlePrefix,
    titleHighlight,
    description,
    primaryButtonText,
    primaryButtonLink,
    secondaryButtonText,
    secondaryButtonLink,
    address,
    statusText,
    heroImage,
    floatingCard1,
    floatingCard2
  }`;

  return client.fetch(query);
}

export default async function Home() {
  const heroData = await getHeroData();

  return <HomeContent heroData={heroData} />;
}
