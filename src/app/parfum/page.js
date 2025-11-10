// src/app/parfum/page.js
import { fetchParfums, fetchAllBrands, fetchAllCategories } from "@/lib/api";
import FilterSidebar from "@/components/FilterSidebar";
import ParfumCardAnimated from "@/components/ParfumCardAnimated";
import Pagination from "@/components/Pagination";
import SearchBox from "@/components/SearchBox";

// Fungsi ini akan dieksekusi di server untuk setiap request
export default async function ParfumCatalogPage({ searchParams }) {
  // Ambil data parfum berdasarkan searchParams dari URL
  const parfumResponse = await fetchParfums(searchParams);
  
  // Ambil data untuk filter (dijalankan secara paralel)
  const [brands, categories] = await Promise.all([
    fetchAllBrands(),
    fetchAllCategories()
  ]);

  const parfums = parfumResponse?.data || [];
  const pagination = parfumResponse?.pagination || null;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Filter */}
      <aside className="w-full md:w-1/4 lg:w-1/5">
        <FilterSidebar brands={brands || []} categories={categories || []} />
      </aside>

      {/* Konten Utama (Grid Parfum) */}
      <div className="w-full md:w-3/4 lg:w-4/5">
        <div className="mb-6">
          <SearchBox initialValue={searchParams.search || ""} />
        </div>
        
        {parfums.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {parfums.map((parfum, index) => (
                <ParfumCardAnimated key={parfum.id} parfum={parfum} index={index} />
              ))}
            </div>
            {pagination && (
              <div className="mt-10">
                <Pagination 
                  currentPage={pagination.page} 
                  totalPages={pagination.totalPages} 
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold">Tidak Ada Parfum Ditemukan</h3>
            <p className="text-gray-500 mt-2">Coba ubah filter atau kata kunci pencarian Anda.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Tambahkan SEO dinamis
export async function generateMetadata({ searchParams }) {
  let title = "Katalog Parfum";
  if (searchParams.search) title = `Hasil Pencarian untuk "${searchParams.search}"`;
  if (searchParams.brand) title = `Parfum Brand ${searchParams.brand}`;
  if (searchParams.category) title = `Parfum Kategori ${searchParams.category}`;

  return {
    title: `${title} - Ensiklopedia Parfum`,
    description: `Jelajahi ${title.toLowerCase()} dan temukan inspirasi wangi Anda.`,
  };
}