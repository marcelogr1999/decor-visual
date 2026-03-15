"use client";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useEffect, useState } from "react";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
              className="h-10 w-auto mb-3 dark:hidden"
            />
            <img
              src="/logo-white.svg"
              alt="DECOR Visual — Comunicação Visual"
              className="h-10 w-auto mb-3 hidden dark:block"
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
                <Link
                  href="/#quem-somos"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link
                  href="/#servicos"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Serviços
                </Link>
              </li>
              <li>
                <Link
                  href="/#contato"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Contato
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href={`tel:${settings?.phone.replace(/\D/g, "")}`}
                  className="hover:text-primary transition-colors"
                >
                  {settings?.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${settings?.email}`}
                  className="hover:text-primary transition-colors"
                >
                  {settings?.email}
                </a>
              </li>
              <li className="leading-relaxed">
                <a
                  href={settings?.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}` : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {settings?.address}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <p className="text-center text-xs text-muted-foreground">
          © {mounted ? currentYear : "2024"} {settings?.companyName || "DECOR Visual"}. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
