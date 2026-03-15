interface ContactProps {
  settings?: {
    phone: string;
    email: string;
    address: string;
    mapsEmbedUrl: string;
  };
}

export function ContactMapSection({ settings }: ContactProps) {
  const number = settings?.phone ? settings.phone.replace(/\D/g, "") : "5541998494501";
  const WHATSAPP_URL = `https://wa.me/${number.startsWith('55') ? number : '55' + number}?text=${encodeURIComponent(
    "Olá! Gostaria de solicitar um orçamento."
  )}`;

  return (
    <section id="contato" className="py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-3">
            Entre em contato
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold tracking-tight">
            Fale Conosco
          </h2>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden bg-card/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
          {/* Left — Contact Info */}
          <div className="p-6 flex flex-col justify-center">
            <div className="space-y-6">
              {/* Phone */}
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-1">
                  Telefone
                </p>
                <a
                  href={`tel:${number}`}
                  className="text-foreground hover:text-primary transition-colors inline-block break-words"
                >
                  {settings?.phone || "(41) 99849-4501"}
                </a>
              </div>

              {/* Email */}
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-1">
                  E-mail
                </p>
                <a
                  href={`mailto:${settings?.email}`}
                  className="text-foreground hover:text-primary transition-colors inline-block break-all sm:break-words"
                >
                  {settings?.email || "decorvisualatendimento@gmail.com"}
                </a>
              </div>

              {/* Address */}
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-1">
                  Endereço
                </p>
                <a
                  href={settings?.mapsEmbedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors inline-block break-words"
                >
                  {settings?.address || "Rua Guilherme Mazeto, 270 — Curitiba, PR"}
                </a>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 w-full lg:w-auto rounded-xl bg-primary text-muted text-sm font-semibold hover:bg-primary/80 transition-all"
              >
                Solicitar orçamento
              </a>
            </div>
          </div>

          {/* Right — Map */}
          <div className="aspect-square lg:aspect-auto min-h-[350px]">
            <iframe
              src={settings?.mapsEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.5!2d-49.2714!3d-25.4495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce46e1b1dfc0b%3A0x1234567890abcdef!2sR.%20Guilherme%20Mazeto%2C%20270%20-%20Curitiba%2C%20PR!5e0!3m2!1spt-BR!2sbr!4v1710000000000!5m2!1spt-BR!2sbr"}
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização DECOR Visual"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
