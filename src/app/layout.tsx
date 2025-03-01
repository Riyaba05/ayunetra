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
  title: "Ayunetra - Your AI-Powered Health Assistant",
  description: "Get personalized recommendations for common day-to-day health concerns with Ayunetra, your intelligent healthcare assistant.",
  keywords: ["healthcare", "AI assistant", "health recommendations", "medical advice", "symptom checker"],
  authors: [{ name: "Ayunetra Team" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/ayunetra.webp",
    apple: "/ayunetra.webp",
  },
  openGraph: {
    title: "Ayunetra - Your AI-Powered Health Assistant",
    description: "Get personalized recommendations for common day-to-day health concerns with Ayunetra, your intelligent healthcare assistant.",
    images: [
      {
        url: "/ayunetra.webp",
        width: 1200,
        height: 630,
        alt: "Ayunetra Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/ayunetra.webp" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
