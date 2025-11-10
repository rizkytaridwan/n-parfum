// src/app/category/[slug]/page.js
import { 
  fetchCategoryBySlug, 
  fetchParfums, 
  fetchAllCategorySlugs 
} from "@/lib/api";
import { notFound } from "next/navigation";
import ParfumCardAnimated from "@/components/ParfumCardAnimated";
import { Frown } from "lucide-react";

// SEO
export async function generateMetadata({ params }) {
  const category = await fetchCategoryBySlug(params.slug);
  if (!category) return { title: "Kategori Tidak Ditemukan" };
  return {
    title: `Parfum Kategori ${category.name}`,
    description: category.description || `Jelajahi semua parfum dalam kategori ${category.name}.`,
    alternates: {
      canonical: `/category/${category.slug}`,
    },
  };
}

// SSG
export async function generateStaticParams() {
  const slugs = await fetchAllCategorySlugs();
  return slugs.map(slug => ({ slug: slug.slug }));
}

// Halaman
export default async function CategoryPage({ params }) {
  const category = await fetchCategoryBySlug(params.slug);
  if (!category) notFound();

  // Ambil semua parfum untuk kategori ini
  const parfumResponse = await fetchParfums({ category: params.slug, limit: 100 });
  const parfums = parfumResponse?.data || [];

  return (
    <div>
      <h1 className="text-4xl font-extrabold mb-4">Kategori: {category.name}</h1>
      {category.description && (
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">{category.description}</p>
      )}

      {parfums.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {parfums.map((parfum, index) => (
            <ParfumCardAnimated key={parfum.id} parfum={parfum} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 flex flex-col items-center">
          <Frown className="h-20 w-20 text-gray-400 mb-6" />
          <h3 className="text-2xl font-semibold">Belum Ada Parfum</h3>
          <p className="text-gray-500 mt-2">Belum ada parfum yang ditambahkan ke kategori ini.</p>
        </div>
      )}
    </div>
  );
}