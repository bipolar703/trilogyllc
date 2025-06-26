import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hexabot AI Agent - Trilogy Trading LLC",
  description:
    "Your Digital Consultant for Global Trade and Supply Chain Solutions. Get instant help with strategic sourcing, logistics optimization, trade documentation, and B2B solutions.",
  keywords:
    "AI chatbot, global trade, supply chain, logistics, sourcing, trade documentation, B2B solutions, Trilogy Trading",
  authors: [{ name: "Trilogy Trading LLC" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Hexabot AI Agent - Trilogy Trading LLC",
    description:
      "Your Digital Consultant for Global Trade and Supply Chain Solutions",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hexabot AI Agent - Trilogy Trading LLC",
    description:
      "Your Digital Consultant for Global Trade and Supply Chain Solutions",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-oid="p5j2h4p">
      <head data-oid="nak81p0">
        <link rel="icon" href="/favicon.ico" data-oid="tfxvt84" />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          data-oid="1pks2_f"
        />

        <meta name="theme-color" content="#1e40af" data-oid="o1b_khs" />
      </head>
      <body className={inter.className} data-oid="2yvq5cr">
        {children}
      </body>
    </html>
  );
}
