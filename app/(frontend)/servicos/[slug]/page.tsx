import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Gallery } from "@/components/Gallery";
import { client } from "@/sanity/lib/client";
import { SERVICE_BY_SLUG_QUERY, ALL_SERVICES_QUERY } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";

export const revalidate = 60; // revalidate at most every 60 seconds

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await client.fetch(ALL_SERVICES_QUERY);
  return services.map((service: any) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await client.fetch(SERVICE_BY_SLUG_QUERY, { slug });

  if (!service) return {};

  return {
    title: service.title,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} | DECOR Visual`,
      description: service.shortDescription,
      images: service.mainImage ? [{ url: urlForImage(service.mainImage)?.width(1200).height(630).url() || "" }] : [],
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = await client.fetch(SERVICE_BY_SLUG_QUERY, { slug });

  if (!service) {
    notFound();
  }

  // JSON-LD for Service
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDescription,
    provider: {
      "@type": "LocalBusiness",
      name: "DECOR Visual",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Link
              href="/"
              className="hover:text-foreground transition-colors"
            >
              Início
            </Link>
            <span>/</span>
            <Link
              href="/#servicos"
              className="hover:text-foreground transition-colors"
            >
              Serviços
            </Link>
            <span>/</span>
            <span className="text-foreground">{service.title}</span>
          </nav>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                {service.title}
              </h1>
            </div>
            <div className="text-lg text-muted-foreground leading-relaxed max-w-3xl prose prose-invert prose-p:text-muted-foreground">
              <PortableText value={service.fullDescription} />
            </div>
          </div>

          {/* Gallery */}
          {service.gallery && service.gallery.length > 0 && (
            <div className="mb-12">
              <h2 className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-6">
                Galeria
              </h2>
              <Gallery images={service.gallery} serviceName={service.title} />
            </div>
          )}

          {/* Back Link */}
          <Link
            href="/#servicos"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform group-hover:-translate-x-1"
            >
              <path
                d="M13 8H3M7 4L3 8l4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Voltar para Serviços
          </Link>
        </div>
      </div>
    </>
  );
}
