import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-[#020817] text-slate-100 min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
