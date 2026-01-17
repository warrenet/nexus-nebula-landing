import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexus Nebula — The AI Team you can watch work",
  description:
    "Nexus Nebula streams an AI 'team' through clear phases so non-technical humans can follow what’s happening. Built by warrenet.",
  applicationName: "Nexus Nebula",
  authors: [{ name: "warrenet" }],
  keywords: [
    "AI",
    "agent",
    "multi-agent",
    "streaming",
    "workflow",
    "demo",
    "productivity",
    "Nexus Nebula",
  ],
  openGraph: {
    title: "Nexus Nebula — The AI Team you can watch work",
    description:
      "Watch an AI team work in phases. Simple view by default, full details when you want them. Built by warrenet.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Nexus Nebula — The AI Team you can watch work",
    description:
      "Watch an AI team work in phases. Simple view by default, full details when you want them.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
