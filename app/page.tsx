import { client } from "@/sanity/lib/client";
import HomeContent from "@/components/home-content";

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
