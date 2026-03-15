import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { ServiceGrid } from "@/components/ServiceGrid";
import { ContactMapSection } from "@/components/ContactMapSection";
import { client } from "@/sanity/lib/client";
import { HOMEPAGE_QUERY, ALL_SERVICES_QUERY, ALL_CLIENTS_QUERY, SETTINGS_QUERY } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

export const revalidate = 60; // revalidate at most every 60 seconds

export default async function Home() {
  const [homepage, services, clients, settings] = await Promise.all([
    client.fetch(HOMEPAGE_QUERY),
    client.fetch(ALL_SERVICES_QUERY),
    client.fetch(ALL_CLIENTS_QUERY),
    client.fetch(SETTINGS_QUERY)
  ]);

  const heroSlides = services.map((s: any) => ({
    image: urlForImage(s.mainImage)?.width(1920).height(1080).url() || "",
    title: s.title,
    subtitle: s.shortDescription,
  }));

  return (
    <>
      <Hero 
        slides={heroSlides} 
        title={homepage?.heroTitle} 
        subtitle={homepage?.heroSubtitle} 
      />
      <ServiceGrid services={services} />
      <AboutSection aboutText={homepage?.aboutText} clients={clients || []} />
      <ContactMapSection settings={settings} />
    </>
  );
}
