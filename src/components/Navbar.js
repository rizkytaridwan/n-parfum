// src/components/Navbar.js
import Link from "next/link";
import { Scent, Home, Library } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
          <Scent className="h-8 w-8" />
          <span>Ensiklopedia Parfum</span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600">
            <Home className="h-5 w-5 mr-1" />
            <span>Home</span>
          </Link>
          <Link href="/parfum" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600">
            <Library className="h-5 w-5 mr-1" />
            <span>Katalog</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}