import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blackbird Holiday",
  description: "Created with mind",
  generator: "Ammaar",
  icons: {
    icon: "/favicon.png", // ✅ Make sure this file is in the public folder
    shortcut: "images/favicon.png",
    apple: "images/favicon.png",
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
        {/* ✅ Favicon setup */}
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased bg-white dark:bg-black`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
