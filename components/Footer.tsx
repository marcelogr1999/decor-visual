import { Separator } from "@/components/ui/separator";

interface FooterProps {
  settings?: {
    companyName: string;
    description: string;
    phone: string;
    email: string;
    address: string;
  };
}

export function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <img
              src="/logo.svg"
              alt="DECOR Visual — Comunicação Visual"
              className="h-10 w-auto mb-3"
            />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {settings?.description || "Especialistas em comunicação visual."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Navegação
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#quem-somos"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Quem Somos
                </a>
              </li>
              <li>
                <a
                  href="#servicos"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Serviços
                </a>
              </li>
              <li>
                <a
                  href="#contato"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Contato
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{settings?.phone}</li>
              <li>{settings?.email}</li>
              <li className="leading-relaxed">{settings?.address}</li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <p className="text-center text-xs text-muted-foreground">
          © {currentYear} {settings?.companyName || "DECOR Visual"}. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
