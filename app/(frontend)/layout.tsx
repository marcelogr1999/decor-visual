import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ThemeProvider } from "@/components/theme-provider";
import { client } from "@/sanity/lib/client";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

const sans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const display = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch(SETTINGS_QUERY);
  if (!settings) return { title: "DECOR Visual" };

  return {
    title: {
      default: `${settings.companyName} — ${settings.tagline}`,
      template: `%s | ${settings.companyName}`,
    },
    description: settings.description,
    keywords: [
      "comunicação visual",
      "placas",
      "banners",
      "adesivos",
      "fachadas",
      "letras caixa",
      "impressão digital",
      "impressão 3D",
      "ACM",
      "Curitiba",
    ],
    icons: {
      icon: "/favicon.svg",
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: settings.companyName,
      title: `${settings.companyName} — ${settings.tagline}`,
      description: settings.description,
      images: settings.ogImage ? [
        {
          url: urlForImage(settings.ogImage).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: settings.companyName,
        }
      ] : [],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await client.fetch(SETTINGS_QUERY);

  // JSON-LD for LocalBusiness
  const jsonLd = settings ? {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: settings.companyName,
    description: settings.description,
    telephone: settings.phone,
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
    },
    url: "https://decorvisual.com.br",
  } : null;

  return (
    <html lang="pt-BR" className={`${sans.variable} ${display.variable}`} suppressHydrationWarning>
      <head>
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">{children}</main>
          <Footer settings={settings} />
          <WhatsAppButton phone={settings?.phone} />
        </ThemeProvider>
      </body>
    </html>
  );
}
