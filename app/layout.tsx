import type { Metadata } from "next";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";

export const metadata: Metadata = {
  title: "XYZ Finders - No. 1 Classified Marketplace",
  description: "Buy and sell products, properties, automobiles, and more on XYZ Finders - India's leading classified marketplace",
  keywords: ["classifieds", "marketplace", "buy", "sell", "products", "properties", "automobiles"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="antialiased">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}

