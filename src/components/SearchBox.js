// src/components/SearchBox.js
"use client";
import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBox({ initialValue = "" }) {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    
    if (searchTerm) {
      params.set('search', searchTerm);
    } else {
      params.delete('search');
    }
    // Selalu reset ke halaman 1 saat search
    params.delete('page');

    // Jika kita sudah di halaman /parfum, update. Jika tidak, redirect ke /parfum.
    if (pathname === '/parfum') {
      router.push(`${pathname}?${params.toString()}`);
    } else {
      router.push(`/parfum?${params.toString()}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Cari nama parfum..."
        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
      />
      <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <Search className="h-5 w-5" />
      </button>
    </form>
  );
}