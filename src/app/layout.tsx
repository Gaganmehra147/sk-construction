import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { prisma } from "@/lib/prisma";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-editorial",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await prisma.seoSetting.findUnique({
      where: { pageKey: "homepage" },
    });
    return {
      title: seo?.title || "Vijay Interior & Construction | Luxury Architecture, Interiors & Turnkey Projects",
      description:
        seo?.description ||
        "Refined architecture, bespoke residential & commercial interiors, and turnkey civil construction.",
      openGraph: {
        title: seo?.title || "Vijay Interior & Construction",
        description: seo?.description || "Spaces Designed To Be Lived In.",
        images: [seo?.ogImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"],
      },
    };
  } catch {
    return {
      title: "Vijay Interior & Construction | Luxury Architecture & Construction",
      description: "Spaces Designed To Be Lived In.",
    };
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${cinzel.variable} ${cormorant.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#FBF9F5] text-[#141414] antialiased selection:bg-[#C5A880]/30 selection:text-[#141414]">
        {children}
      </body>
    </html>
  );
}
