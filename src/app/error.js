// src/app/error.js
"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-400px)] text-center">
      <AlertTriangle className="h-20 w-20 text-red-500 mb-6" />
      <h2 className="text-4xl font-extrabold mb-4">Terjadi Kesalahan</h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Maaf, terjadi kesalahan saat memuat halaman ini.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Coba Lagi
      </button>
    </div>
  );
}