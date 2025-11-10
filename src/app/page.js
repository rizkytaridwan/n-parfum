// src/app/page.js
import Link from "next/link";
import SearchBox from "@/components/SearchBox";
import { ArrowRight, Frown } from "lucide-react";
import { Suspense } from "react";
import RecentParfums from "@/components/RecentParfums";
import { RecentParfumsSkeleton } from "@/components/ParfumListSkeleton";

export default async function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-20 bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
            Temukan Inspirasi Wangi Anda
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Jelajahi ribuan referensi wangi parfum refill berdasarkan aroma, brand, dan kategori.
          </p>
          <div className="max-w-md mx-auto">
            <SearchBox />
          </div>
        </div>
      </section>

      {/* Bagian Parfum Terbaru */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Terbaru Ditambahkan</h2>
          <Link href="/parfum" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
            Lihat Semua <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
        
        <Suspense fallback={<RecentParfumsSkeleton />}>
          <RecentParfums />
        </Suspense>
      </section>
    </div>
  );
}