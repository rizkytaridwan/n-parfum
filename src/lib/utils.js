// src/lib/utils.js
const API_ASSET_URL = process.env.NEXT_PUBLIC_API_ASSET_URL;

/**
 * Mengambil URL gambar dari backend dan mengubahnya menjadi URL lengkap.
 * Backend menyimpan /public/uploads/image.jpg
 * Frontend butuh http://127.0.0.1:8000/public/uploads/image.jpg
 */
export function getImageUrl(path) {
  if (!path) {
    // Kembalikan placeholder jika tidak ada gambar
    return "https://via.placeholder.com/400x400.png?text=No+Image";
  }
  
  // Langsung gabungkan URL Aset dengan path dari database
  // Contoh: http://127.0.0.1:8000 + /public/uploads/image.jpg
  return `${API_ASSET_URL}${path}`;
}