// src/lib/utils.js
const API_ASSET_URL = process.env.NEXT_PUBLIC_API_ASSET_URL;

/**
 * Mengambil URL gambar dari backend dan mengubahnya menjadi URL lengkap.
 * Backend menyimpan /public/uploads/image.jpg
 * Frontend butuh http://127.0.0.1:8000/public/uploads/image.jpg
 */
export function getImageUrl(path) {
  if (!path) return '/placeholder.svg'; // fallback bebas
  if (/^https?:\/\//i.test(path)) return path;

  const base = (process.env.NEXT_PUBLIC_API_ASSET_URL || '').replace(/\/+$/, '');
  const rel  = String(path).replace(/^\/+/, '');
  return `${base}/${rel}`;
}