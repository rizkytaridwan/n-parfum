// src/app/parfum/[slug]/page.js
import { 
  fetchParfumBySlug, 
  fetchAllParfumSlugs 
} from "@/lib/api";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import PyramidDisplay from "@/components/PyramidDisplay";
import { notFound } from "next/navigation";

// Fungsi untuk SEO dinamis (Judul & Meta Deskripsi)
export async function generateMetadata({ params }) {
  const parfum = await fetchParfumBySlug(params.slug);
  if (!parfum) {
    return { title: "Tidak Ditemukan" };
  }

  // Buat deskripsi SEO dari notes
  const topNotes = parfum.pyramid.top.map(n => n.name).join(', ');
  
  return {
    title: `${parfum.name} oleh ${parfum.brandName} - Ensiklopedia Parfum`,
    description: parfum.description || `Wangi ${parfum.name} memiliki top notes: ${topNotes}.`,
    openGraph: {
      title: parfum.name,
      description: parfum.description,
      images: [getImageUrl(parfum.imageUrl)],
    },
  };
}

// Fungsi untuk membuat semua halaman statis saat build
export async function generateStaticParams() {
  const slugs = await fetchAllParfumSlugs();
  return slugs.map(slug => ({ slug: slug.slug }));
}

// Komponen Halaman
export default async function ParfumDetailPage({ params }) {
  const parfum = await fetchParfumBySlug(params.slug);

  // Jika parfum tidak ditemukan (mis. slug salah), tampilkan 404
  if (!parfum) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Kolom Gambar */}
        <div className="w-full">
          <Image
            src={getImageUrl(parfum.imageUrl)}
            alt={`Parfum ${parfum.name}`}
            width={500}
            height={500}
            className="rounded-lg shadow-lg object-cover w-full aspect-square"
          />
        </div>

        {/* Kolom Info */}
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold">{parfum.name}</h1>
          <div className="flex items-center space-x-2 text-lg">
            <span className="text-gray-500">oleh</span>
            <Link href={`/brand/${parfum.brandSlug}`} className="text-blue-600 hover:underline font-semibold">
              {parfum.brandName}
            </Link>
          </div>
          
          <div className="flex items-center space-x-2 text-md">
            <span className="text-gray-500">Kategori:</span>
            <Link href={`/category/${parfum.categorySlug}`} className="text-blue-500 hover:underline">
              {parfum.categoryName}
            </Link>
          </div>

          {parfum.launchYear && (
            <p className="text-gray-600">
              Tahun Rilis: <span className="font-medium">{parfum.launchYear}</span>
            </p>
          )}

          {parfum.description && (
            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
              {parfum.description}
            </p>
          )}
        </div>
      </div>

      {/* Piramida Aroma */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <PyramidDisplay pyramid={parfum.pyramid} />
      </div>
    </div>
  );
}