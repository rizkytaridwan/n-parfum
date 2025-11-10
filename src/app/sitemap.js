// src/app/sitemap.js
import { fetchAllParfumSlugs, fetchAllBrandSlugs, fetchAllCategorySlugs, fetchAllNoteSlugs } from "@/lib/api";

// Ganti URL dengan domain produksi Anda
const URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default async function sitemap() {
  // Ambil semua slug (paralel)
  const [parfumSlugs, brandSlugs, categorySlugs, noteSlugs] = await Promise.all([
    fetchAllParfumSlugs(),
    fetchAllBrandSlugs(),
    fetchAllCategorySlugs(),
    fetchAllNoteSlugs(),
  ]);

  const parfums = parfumSlugs.map(({ slug }) => ({
    url: `${URL}/parfum/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const brands = brandSlugs.map(({ slug }) => ({
    url: `${URL}/brand/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const categories = categorySlugs.map(({ slug }) => ({
    url: `${URL}/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));
  
  const notes = noteSlugs.map(({ slug }) => ({
    url: `${URL}/notes/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  // Halaman statis
  const staticPages = [
    {
      url: URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${URL}/parfum`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  return [
    ...staticPages,
    ...parfums,
    ...brands,
    ...categories,
    ...notes,
  ];
}