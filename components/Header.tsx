"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <img
            src="/logo.svg"
            alt="DECOR Visual"
            className="h-10 w-auto dark:hidden"
          />
          <img
            src="/logo-white.svg"
            alt="DECOR Visual"
            className="h-10 w-auto hidden dark:block"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/#servicos"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Serviços
          </Link>
          <Link
            href="/#quem-somos"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Quem Somos
          </Link>
          <Link
            href="/#contato"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Contato
          </Link>
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span
            className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-48" : "max-h-0"}`}
      >
        <nav className="flex flex-col gap-1 px-6 pb-4">
          <Link
            href="/#quem-somos"
            onClick={() => setMenuOpen(false)}
            className="py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Quem Somos
          </Link>
          <Link
            href="/#servicos"
            onClick={() => setMenuOpen(false)}
            className="py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Serviços
          </Link>
          <Link
            href="/#contato"
            onClick={() => setMenuOpen(false)}
            className="py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Contato
          </Link>
          <div className="py-2 mt-2 border-t border-border/50 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Alternar tema</span>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
