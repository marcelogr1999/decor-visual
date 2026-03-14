import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { ALL_SERVICES_QUERY } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://decorvisual.com.br";
  
  const services = await client.fetch(ALL_SERVICES_QUERY);

  const servicePages = services.map((service: any) => ({
    url: `${baseUrl}/servicos/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    ...servicePages,
  ];
}
