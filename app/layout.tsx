import type { Metadata } from "next";
import { Archivo, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "700", "900"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://miljanmilojkovic.com";

export const metadata: Metadata = {
  title: "Miljan Milojkovic — Full-Stack Developer",
  description:
    "Full-stack developer (.NET, C#, Laravel, React, Vue, Next.js) with ~5 years of experience building APIs and business systems.",
  openGraph: {
    title: "Miljan Milojkovic — Full-Stack Developer",
    description:
      "Full-stack developer (.NET, C#, Laravel, React, Vue, Next.js) with ~5 years of experience building APIs and business systems.",
    url: siteUrl,
    siteName: "Miljan Milojkovic",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Miljan Milojkovic — Full-Stack Developer",
    description:
      "Full-stack developer (.NET, C#, Laravel, React, Vue, Next.js) with ~5 years of experience building APIs and business systems.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${instrumentSans.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
