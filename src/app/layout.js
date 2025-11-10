// src/app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ensiklopedia Parfum - Temukan Inspirasi Wangi Anda",
  description: "Database wangi parfum refill terlengkap di Indonesia. Cari berdasarkan notes, brand, dan kategori.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}