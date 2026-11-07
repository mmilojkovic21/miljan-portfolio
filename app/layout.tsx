import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://miljanmilojkovic.com";

export const metadata: Metadata = {
  title: "Miljan Milojković — Full-Stack Software Engineer",
  description:
    "Full-stack software engineer (.NET, C#, ASP.NET Core, Vue, React, Next.js) with 5 years of experience building business-critical web apps and APIs.",
  openGraph: {
    title: "Miljan Milojković — Full-Stack Software Engineer",
    description:
      "Full-stack software engineer (.NET, C#, ASP.NET Core, Vue, React, Next.js) with 5 years of experience building business-critical web apps and APIs.",
    url: siteUrl,
    siteName: "Miljan Milojković",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Miljan Milojković — Full-Stack Software Engineer",
    description:
      "Full-stack software engineer (.NET, C#, ASP.NET Core, Vue, React, Next.js) with 5 years of experience building business-critical web apps and APIs.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
