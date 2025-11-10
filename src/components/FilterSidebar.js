// src/components/FilterSidebar.js
"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Filter, X } from "lucide-react";

// Komponen helper untuk daftar filter
const FilterGroup = ({ title, items, paramKey, currentParam }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterChange = (type, value) => {
    const params = new URLSearchParams(searchParams);
    
    if (params.get(type) === value) {
      params.delete(type);
    } else {
      params.set(type, value);
    }
    params.delete('page');
    
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-100">{title}</h4>
      <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
        {items.map((item) => (
          <label key={item.id} className="flex items-center space-x-2 cursor-pointer group">
            <input
              type="radio"
              name={paramKey}
              className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-offset-gray-800"
              value={item.slug}
              checked={currentParam === item.slug}
              onChange={() => handleFilterChange(paramKey, item.slug)}
            />
            <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {item.name}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};


export default function FilterSidebar({ brands, categories, notes }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false); // Untuk mobile

  const clearFilters = () => {
    // Hanya hapus filter, jangan hapus search
    const params = new URLSearchParams(searchParams);
    params.delete('brand');
    params.delete('category');
    params.delete('note');
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };

  const currentBrand = searchParams.get('brand');
  const currentCategory = searchParams.get('category');
  const currentNote = searchParams.get('note');
  
  const hasActiveFilters = currentBrand || currentCategory || currentNote;

  const filterContent = (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-3 border-b dark:border-gray-700">
        <h3 className="text-xl font-bold">Filter</h3>
        {hasActiveFilters && (
          <button 
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:underline"
          >
            Reset
          </button>
        )}
      </div>

      <FilterGroup 
        title="Brand"
        items={brands}
        paramKey="brand"
        currentParam={currentBrand}
      />
      <FilterGroup 
        title="Kategori"
        items={categories}
        paramKey="category"
        currentParam={currentCategory}
      />
      <FilterGroup 
        title="Aroma (Notes)"
        items={notes}
        paramKey="note"
        currentParam={currentNote}
      />
    </div>
  );

  return (
    <>
      {/* Tombol Filter Mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden w-full flex items-center justify-center p-3 bg-blue-600 text-white rounded-lg mb-4 shadow-md hover:bg-blue-700 transition-colors"
      >
        <Filter className="h-5 w-5 mr-2" />
        {isOpen ? "Tutup Filter" : "Buka Filter"}
      </button>

      {/* Tampilan Desktop */}
      <div className="hidden md:block p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 sticky top-24">
        {filterContent}
      </div>

      {/* Tampilan Mobile (Drawer/Modal) */}
      {isOpen && (
        <div className="md:hidden p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 mb-4 shadow-lg">
          <button onClick={() => setIsOpen(false)} className="float-right p-1 -mt-2 -mr-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
            <X className="h-6 w-6" />
          </button>
          {filterContent}
        </div>
      )}
    </>
  );
}