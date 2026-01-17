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
  metadataBase: new URL("https://nexus-nebula-landing.vercel.app"),
  title: "Nexus Nebula — The AI Team you can watch work",
  description:
    "Nexus Nebula streams an AI 'team' through clear phases so non-technical humans can follow what’s happening. Built by warrenet.",
  applicationName: "Nexus Nebula",
  authors: [{ name: "warrenet" }],
  openGraph: {
    title: "Nexus Nebula — The AI Team you can watch work",
    description:
      "Watch an AI team work in phases. Simple view by default, full details when you want them. Built by warrenet.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Nexus Nebula — The AI Team you can watch work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus Nebula — The AI Team you can watch work",
    description: "Watch an AI team work in phases. Simple view by default, full details when you want them.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
