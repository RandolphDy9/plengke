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
  title:
    "P'lengke - Pamilihang Bayan ng Montreal | Authentic Filipino Restaurant & Grocery",
  description:
    "Experience authentic Filipino cuisine at P'lengke in Montreal. From traditional dishes like Bulalo and Kare-Kare to fresh Filipino groceries. Visit us at 4693 Ave Vanhorne, Montreal, QC.",
  keywords: [
    "Filipino restaurant Montreal",
    "Filipino grocery Montreal",
    "P'lengke",
    "Pamilihang Bayan ng Montreal",
    "Filipino food Montreal",
    "Authentic Filipino cuisine",
    "Bulalo Montreal",
    "Kare-Kare Montreal",
    "Filipino market Montreal",
  ],
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "P'lengke - Authentic Filipino Restaurant & Grocery in Montreal",
    description:
      "Experience authentic Filipino cuisine and groceries at P'lengke. Traditional dishes made with love and tradition.",
    type: "website",
    locale: "en_CA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
