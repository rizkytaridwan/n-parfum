// src/app/brand/[slug]/page.js
import { 
  fetchBrandBySlug, 
  fetchParfums, 
  fetchAllBrandSlugs 
} from "@/lib/api";
import { notFound } from "next/navigation";
import ParfumCardAnimated from "@/components/ParfumCardAnimated";

// SEO
export async function generateMetadata({ params }) {
  const brand = await fetchBrandBySlug(params.slug);
  if (!brand) return { title: "Brand Tidak Ditemukan" };
  return {
    title: `Semua Parfum dari ${brand.name}`,
    description: brand.description || `Jelajahi semua parfum dari ${brand.name}.`,
  };
}

// SSG
export async function generateStaticParams() {
  const slugs = await fetchAllBrandSlugs();
  return slugs.map(slug => ({ slug: slug.slug }));
}

// Halaman
export default async function BrandPage({ params }) {
  const brand = await fetchBrandBySlug(params.slug);
  if (!brand) notFound();

  // Ambil semua parfum untuk brand ini
  const parfumResponse = await fetchParfums({ brand: params.slug, limit: 100 });
  const parfums = parfumResponse?.data || [];

  return (
    <div>
      <h1 className="text-4xl font-extrabold mb-4">{brand.name}</h1>
      {brand.description && (
        <p className="text-lg text-gray-600 mb-8 max-w-2xl">{brand.description}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {parfums.map((parfum, index) => (
          <ParfumCardAnimated key={parfum.id} parfum={parfum} index={index} />
        ))}
      </div>
    </div>
  );
}