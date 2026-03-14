import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { urlForImage } from "@/sanity/lib/image";
interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  mainImage: any;
}

export function ServiceGrid({ services }: { services: Service[] }) {
  return (
    <section id="servicos" className="py-24 scroll-mt-20 bg-secondary/50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-3">
            O que fazemos
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold tracking-tight">
            Nossos Serviços
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            Soluções completas em comunicação visual para destacar o seu negócio
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/servicos/${service.slug}`}
              className="group block"
            >
              <Card className="h-full overflow-hidden border-border/60 bg-background hover:shadow-lg hover:shadow-primary/5 hover:scale-[1.02] transition-all duration-300 p-0 gap-0">
                {/* Image */}
                <div className="img-zoom aspect-[16/10] relative">
                  <img
                    src={urlForImage(service.mainImage)?.width(800).height(500).url() || ""}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {service.shortDescription}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
