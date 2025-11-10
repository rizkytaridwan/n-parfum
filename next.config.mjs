// next.config.mjs

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */

  turbopack: {
    root: __dirname,
  },

  // TAMBAHKAN BLOK INI
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/public/uploads/**', // Izinkan semua gambar dari folder ini
      },
    ],
  },
};

export default nextConfig;