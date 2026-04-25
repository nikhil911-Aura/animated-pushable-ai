import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces, Rubik, Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import AnimationShell from "@/components/animation/AnimationShell";
import PageLoader     from "@/components/PageLoader";
import ScrollToHash   from "@/components/ScrollToHash";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
  display: "swap",
  weight: "variable",
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pushable AI — AI Assistants That Run Your Business",
  description:
    "AI Assistants that quietly automate your routine workflows. Less manual work, silent automation, real business outcomes.",
  keywords: ["AI assistant", "workflow automation", "business AI", "Pushable AI"],
  openGraph: {
    title: "Pushable AI — AI Assistants That Run Your Business",
    description: "AI Assistants that quietly automate your routine workflows.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${rubik.variable} ${instrumentSerif.variable} ${inter.variable} antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://d8j0ntlcm91z4.cloudfront.net" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="bg-[#010828] text-[#EFF4FF] min-h-screen overflow-x-hidden">
        <PageLoader />
        <ScrollToHash />
        <AnimationShell>{children}</AnimationShell>
      </body>
    </html>
  );
}
