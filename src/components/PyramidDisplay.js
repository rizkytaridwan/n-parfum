// src/components/PyramidDisplay.js
import Link from "next/link";
import { Sparkles, Leaf, Box } from "lucide-react";

const NoteTag = ({ note }) => (
  <Link 
    href={`/notes/${note.slug}`} // (Asumsi Anda akan membuat halaman /notes/[slug] nanti)
    className="inline-block bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-800 transition"
  >
    {note.name}
  </Link>
);

const Section = ({ title, notes, Icon }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border dark:border-gray-700">
    <h3 className="flex items-center text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
      <Icon className="h-6 w-6 mr-3" />
      {title}
    </h3>
    <div className="flex flex-wrap gap-2">
      {notes.length > 0 ? (
        notes.map(note => <NoteTag key={note.slug} note={note} />)
      ) : (
        <p className="text-gray-500 text-sm">Belum ada notes.</p>
      )}
    </div>
  </div>
);

export default function PyramidDisplay({ pyramid }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center mb-8">Piramida Aroma</h2>
      <Section title="Top Notes" notes={pyramid.top} Icon={Sparkles} />
      <Section title="Middle Notes" notes={pyramid.middle} Icon={Leaf} />
      <Section title="Base Notes" notes={pyramid.base} Icon={Box} />
    </div>
  );
}