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
      </head>
      <body className="antialiased">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}

