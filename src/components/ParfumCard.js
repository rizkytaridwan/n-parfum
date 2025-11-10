// src/components/ParfumCard.js
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils";

export default function ParfumCard({ parfum }) {
  if (!parfum) return null;

  return (
    <Link href={`/parfum/${parfum.slug}`} className="block group">
      <div className="border rounded-lg overflow-hidden shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700 h-full flex flex-col">
        <div className="relative w-full aspect-square overflow-hidden">
          <Image
            src={getImageUrl(parfum.imageUrl)}
            alt={`Gambar ${parfum.name}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="text-xl font-semibold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {parfum.name}
          </h3>
          <p className="text-sm text-gray-500 mb-2">
            {parfum.brandName}
          </p>
          <div className="mt-auto">
            <span className="text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-0.5 rounded">
              {parfum.categoryName}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}