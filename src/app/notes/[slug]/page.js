// src/app/notes/[slug]/page.js
import { 
  fetchNoteBySlug, 
  fetchParfums, 
  fetchAllNoteSlugs 
} from "@/lib/api";
import { notFound } from "next/navigation";
import ParfumCardAnimated from "@/components/ParfumCardAnimated";
import { Frown } from "lucide-react";

// SEO
export async function generateMetadata({ params: paramsPromise }) { // Ubah nama
  const params = await paramsPromise; // TAMBAHKAN AWAIT
  const note = await fetchNoteBySlug(params.slug);
  if (!note) return { title: "Aroma Tidak Ditemukan" };
  return {
    title: `Parfum dengan Aroma ${note.name}`,
    description: note.description || `Jelajahi semua parfum dengan aroma (note) ${note.name}.`,
    alternates: {
      canonical: `/notes/${note.slug}`,
    },
  };
}

// SSG
export async function generateStaticParams() {
  const slugs = await fetchAllNoteSlugs();
  return slugs.map(slug => ({ slug: slug.slug }));
}

// Halaman
export default async function NotePage({ params: paramsPromise }) { // Ubah nama
  const params = await paramsPromise; // TAMBAHKAN AWAIT
  const note = await fetchNoteBySlug(params.slug);
  if (!note) notFound();

  // Ambil semua parfum untuk note ini
  const parfumResponse = await fetchParfums({ note: params.slug, limit: 100 });
  const parfums = parfumResponse?.data || [];

  return (
    <div>
      <h1 className="text-4xl font-extrabold mb-4">Aroma: {note.name}</h1>
      {note.description && (
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">{note.description}</p>
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
          <p className="text-gray-500 mt-2">Belum ada parfum yang ditambahkan dengan aroma ini.</p>
        </div>
      )}
    </div>
  );
}