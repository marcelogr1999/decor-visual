import { urlForImage } from "@/sanity/lib/image";

interface AboutProps {
  aboutText?: string;
  clients: any[];
}

export function AboutSection({ aboutText, clients }: AboutProps) {
  return (
    <section id="quem-somos" className="py-16 scroll-mt-20 bg-brand-red">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center text-white">
          {/* Left — Text */}
          <div className="text-center lg:text-left">
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold tracking-tight mb-6">
              Quem Somos
            </h2>
            <div className="space-y-4 text-white/90 leading-relaxed text-sm sm:text-base">
              {aboutText ? (
                <p>{aboutText}</p>
              ) : (
                <>
                  <p>
                    Bem-vindo à DECOR Visual, a mais completa empresa de comunicação
                    visual em Curitiba, com mais de 15 anos de experiência.
                  </p>
                  <p>
                    Especializados em impressão digital, corte a laser de acrílico e
                    MDF, e impressão 3D de letras caixa, transformamos suas ideias em
                    soluções visuais impactantes.
                  </p>
                </>
              )}
              <p className="font-medium text-white">
                Junte-se a nós e descubra como podemos elevar a sua marca!
              </p>
            </div>
          </div>

          {/* Right — Client Logos */}
          <div className="border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.15em] text-white/70 font-semibold mb-6 text-center lg:text-left">
              Clientes que confiam em nós
            </p>
            {/* Denser grid: 3 cols on mobile, 4 on desktop */}
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 gap-3">
              {clients.map((client) => (
                <div
                  key={client.name}
                  className="flex items-center justify-center p-3 h-14 sm:h-16 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                >
                  <img
                    src={urlForImage(client.logo)?.width(200).url() || ""}
                    alt={client.name}
                    className="max-h-full max-w-full opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
