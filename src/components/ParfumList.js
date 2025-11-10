// src/components/ParfumList.js
import { fetchParfums } from "@/lib/api";
import ParfumCardAnimated from "@/components/ParfumCardAnimated";
import Pagination from "@/components/Pagination";
import { Frown } from "lucide-react";

// FIX: Terima props sebagai nilai primitif, bukan objek searchParams
export default async function ParfumList({ page, limit, search, brand, category, note }) {
  
  // FIX: Buat objek params biasa untuk dikirim ke API
  const params = { page, limit, search, brand, category, note };
  
  const parfumResponse = await fetchParfums(params);
  
  const parfums = parfumResponse?.data || [];
  const pagination = parfumResponse?.pagination || null;

  if (parfums.length === 0) {
    return (
      <div className="text-center py-20 flex flex-col items-center">
        <Frown className="h-20 w-20 text-gray-400 mb-6" />
        <h3 className="text-2xl font-semibold">Tidak Ada Parfum Ditemukan</h3>
        <p className="text-gray-500 mt-2 max-w-sm">
          Coba ubah filter atau kata kunci pencarian Anda untuk menemukan wangi yang Anda cari.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {parfums.map((parfum, index) => (
          <ParfumCardAnimated key={parfum.id} parfum={parfum} index={index} />
        ))}
      </div>
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-10">
          <Pagination 
            currentPage={pagination.page} 
            totalPages={pagination.totalPages} 
          />
        </div>
      )}
    </>
  );
}