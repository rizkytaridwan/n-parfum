// src/lib/api.js
const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchAPI(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    // Gunakan 'no-cache' untuk SSR agar data selalu fresh
    // atau revalidate untuk ISR
    next: { revalidate: 60 }, // Revalidasi ISR setiap 60 detik
  };
  
  const res = await fetch(url, { ...defaultOptions, ...options });

  if (!res.ok) {
    // Jangan log 404 sebagai error server, itu valid
    if (res.status !== 404) {
      console.error(`Fetch error: ${res.statusText} (${res.status}) on ${url}`);
    }
    // Return null agar page.js bisa handle notFound()
    return null;
  }
  return res.json();
}

// --- API Endpoints ---

/**
 * Mengambil daftar parfum dengan filter
 * Cocok dengan: getAllParfum di parfumController.js
 */
export async function fetchParfums(params = {}) {
  const query = new URLSearchParams();
  if (params.page) query.append('page', params.page);
  if (params.limit) query.append('limit', params.limit);
  if (params.search) query.append('search', params.search);
  if (params.brand) query.append('brand', params.brand);
  if (params.category) query.append('category', params.category);
  if (params.note) query.append('note', params.note); // <-- TAMBAHAN BARU

  return fetchAPI(`/parfum?${query.toString()}`);
}

/**
 * Mengambil satu parfum berdasarkan slug
 * Cocok dengan: getParfumBySlug di parfumController.js
 */
export async function fetchParfumBySlug(slug) {
  if (!slug) return null; // Guard tambahan
  return fetchAPI(`/parfum/${slug}`);
}

/**
 * Mengambil semua brand (untuk filter)
 * Cocok dengan: getAllBrands di brandController.js
 */
export async function fetchAllBrands() {
  return fetchAPI('/brands');
}

/**
 * Mengambil satu brand berdasarkan slug
 * Cocok dengan: getBrandBySlug di brandController.js
 */
export async function fetchBrandBySlug(slug) {
  return fetchAPI(`/brands/${slug}`);
}

/**
 * Mengambil semua kategori (untuk filter)
 * Cocok dengan: getAllCategories di categoriesController.js
 */
export async function fetchAllCategories() {
  return fetchAPI('/categories');
}

/**
 * Mengambil satu kategori berdasarkan slug
 * Cocok dengan: getCategoryBySlug di categoriesController.js
 */
export async function fetchCategoryBySlug(slug) {
  return fetchAPI(`/categories/${slug}`);
}

// --- FUNGSI BARU UNTUK NOTES ---

/**
 * Mengambil semua notes (untuk filter)
 */
export async function fetchAllNotes() {
  return fetchAPI('/notes');
}

/**
 * Mengambil satu note berdasarkan slug
 */
export async function fetchNoteBySlug(slug) {
  return fetchAPI(`/notes/${slug}`);
}

// --- FUNGSI BARU UNTUK SSG (generateStaticParams) ---

/**
 * Helper untuk SSG (generateStaticParams)
 * Mengambil semua slug parfum
 */
export async function fetchAllParfumSlugs() {
  const data = await fetchAPI('/parfum?limit=1000'); // Ambil semua
  if (!data || !data.data) return [];
  return data.data.map((p) => ({ slug: p.slug }));
}

/**
 * Helper untuk SSG (generateStaticParams)
 * Mengambil semua slug brand
 */
export async function fetchAllBrandSlugs() {
  const brands = await fetchAPI('/brands');
  if (!brands) return [];
  return brands.map((b) => ({ slug: b.slug }));
}

/**
 * Helper untuk SSG (generateStaticParams)
 * Mengambil semua slug kategori
 */
export async function fetchAllCategorySlugs() {
  const categories = await fetchAPI('/categories');
  if (!categories) return [];
  return categories.map((c) => ({ slug: c.slug }));
}

/**
 * Helper untuk SSG (generateStaticParams)
 * Mengambil semua slug notes
 */
export async function fetchAllNoteSlugs() {
  const notes = await fetchAPI('/notes');
  if (!notes) return [];
  return notes.map((n) => ({ slug: n.slug }));
}