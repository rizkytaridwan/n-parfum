// src/app/parfum/page.js
import { fetchAllBrands, fetchAllCategories, fetchAllNotes } from "@/lib/api";
import FilterSidebar from "@/components/FilterSidebar";
import SearchBox from "@/components/SearchBox";
import { Suspense } from "react";
import ParfumList from "@/components/ParfumList";
import { ParfumListSkeleton } from "@/components/ParfumListSkeleton";

// Fungsi ini akan dieksekusi di server untuk setiap request
export default async function ParfumCatalogPage({ searchParams }) {
  // Ambil data untuk filter (dijalankan secara paralel)
  const [brands, categories, notes] = await Promise.all([
    fetchAllBrands(),
    fetchAllCategories(),
    fetchAllNotes() 
  ]);

  // FIX: Ekstrak nilai primitif dari searchParams di sini
  const page = searchParams.page;
  const limit = searchParams.limit;
  const search = searchParams.search;
  const brand = searchParams.brand;
  const category = searchParams.category;
  const note = searchParams.note;

  // Buat key unik dari nilai-nilai tersebut
  const suspenseKey = `${page}-${limit}-${search}-${brand}-${category}-${note}`;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Filter */}
      <aside className="w-full md:w-1/4 lg:w-1/5">
        <FilterSidebar 
          brands={brands || []} 
          categories={categories || []}
          notes={notes || []}
        />
      </aside>

      {/* Konten Utama (Grid Parfum) */}
      <div className="w-full md:w-3/4 lg:w-4/5">
        <div className="mb-6">
          {/* FIX: Kirim nilai primitif 'search' */}
          <SearchBox initialValue={search || ""} />
        </div>
        
        {/* FIX: Gunakan key dari nilai primitif */}
        <Suspense key={suspenseKey} fallback={<ParfumListSkeleton />}>
          {/* FIX: Kirim semua parameter sebagai props terpisah */}
          <ParfumList 
            page={page}
            limit={limit}
            search={search}
            brand={brand}
            category={category}
            note={note}
          />
        </Suspense>
      </div>
    </div>
  );
}

// Tambahkan SEO dinamis
export async function generateMetadata({ searchParams }) {
  // FIX: Ekstrak nilai primitif di sini juga
  const search = searchParams.search;
  const brand = searchParams.brand;
  const category = searchParams.category;
  const note = searchParams.note;

  let title = "Katalog Parfum";
  let description = "Jelajahi semua parfum dalam database kami. Filter berdasarkan brand, kategori, atau aroma notes.";

  if (search) {
    title = `Hasil Pencarian untuk "${search}"`;
    description = `Lihat hasil pencarian parfum untuk "${search}".`;
  } else if (brand) {
    title = `Parfum Brand ${brand}`;
    description = `Lihat semua parfum dari brand ${brand}.`;
  } else if (category) {
    title = `Parfum Kategori ${category}`;
    description = `Lihat semua parfum dalam kategori ${category}.`;
  } else if (note) {
    title = `Parfum dengan Aroma ${note}`;
    description = `Temukan parfum yang memiliki aroma ${note}.`;
  }

  return {
    title: `${title} - Ensiklopedia Parfum`,
    description: description,
    alternates: {
      canonical: `/parfum`, // Halaman katalog utama
    },
  };
}