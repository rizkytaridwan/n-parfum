// src/app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

// URL dasar situs Anda. Ganti localhost:3000 dengan domain produksi Anda
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata = {
  // Tambahkan metadataBase untuk SEO
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ensiklopedia Parfum - Temukan Inspirasi Wangi Anda",
    template: "%s - Ensiklopedia Parfum", // Judul dinamis
  },
  description: "Database wangi parfum refill terlengkap di Indonesia. Cari berdasarkan notes, brand, dan kategori.",
  openGraph: {
    title: "Ensiklopedia Parfum",
    description: "Database wangi parfum refill terlengkap di Indonesia.",
    url: siteUrl,
    siteName: "Ensiklopedia Parfum",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`, // Anda harus membuat gambar ini
        width: 1200,
        height: 630,
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Ensiklopedia Parfum",
    description: "Database wangi parfum refill terlengkap di Indonesia.",
    images: [`${siteUrl}/og-image.jpg`], // Anda harus membuat gambar ini
  },
  //... tambahkan metadata lain jika perlu
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body 
        className={`${inter.className} flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100`}
      >
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}