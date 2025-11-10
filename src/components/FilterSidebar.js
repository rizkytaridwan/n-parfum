// src/components/FilterSidebar.js
"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Filter, X } from "lucide-react";

export default function FilterSidebar({ brands, categories }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false); // Untuk mobile

  // Buat URL baru berdasarkan filter
  const handleFilterChange = (type, value) => {
    const params = new URLSearchParams(searchParams);
    
    // Jika value sudah ada, hapus (toggle)
    if (params.get(type) === value) {
      params.delete(type);
    } else {
      params.set(type, value);
    }
    // Selalu reset ke halaman 1 saat filter berubah
    params.delete('page');
    
    router.push(`${pathname}?${params.toString()}`);
  };
  
  const clearFilters = () => {
    router.push(pathname);
  };

  const currentBrand = searchParams.get('brand');
  const currentCategory = searchParams.get('category');

  const filterContent = (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Filter</h3>
        <button 
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:underline"
        >
          Reset
        </button>
      </div>

      {/* Filter Brand */}
      <div>
        <h4 className="font-medium mb-3">Brand</h4>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {brands.map((brand) => (
            <label key={brand.id} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="brand"
                className="form-radio h-4 w-4 text-blue-600"
                value={brand.slug}
                checked={currentBrand === brand.slug}
                onChange={() => handleFilterChange('brand', brand.slug)}
              />
              <span className="text-gray-700 dark:text-gray-300">{brand.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Filter Kategori */}
      <div>
        <h4 className="font-medium mb-3">Kategori</h4>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                className="form-radio h-4 w-4 text-blue-600"
                value={category.slug}
                checked={currentCategory === category.slug}
                onChange={() => handleFilterChange('category', category.slug)}
              />
              <span className="text-gray-700 dark:text-gray-300">{category.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Tombol Filter Mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden w-full flex items-center justify-center p-3 bg-blue-600 text-white rounded-lg mb-4"
      >
        <Filter className="h-5 w-5 mr-2" />
        {isOpen ? "Tutup Filter" : "Buka Filter"}
      </button>

      {/* Tampilan Desktop */}
      <div className="hidden md:block p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        {filterContent}
      </div>

      {/* Tampilan Mobile (Drawer/Modal) */}
      {isOpen && (
        <div className="md:hidden p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 mb-4">
          <button onClick={() => setIsOpen(false)} className="float-right">
            <X className="h-6 w-6" />
          </button>
          {filterContent}
        </div>
      )}
    </>
  );
}