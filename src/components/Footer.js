// src/components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
      <div className="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Ensiklopedia Parfum. Dibuat untuk referensi.</p>
      </div>
    </footer>
  );
}