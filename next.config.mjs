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

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1', // <-- FIX: Ganti 'localhost' menjadi '127.0.0.1'
        port: '8000',
        pathname: '/public/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'api.domainanda.com', // GANTI DENGAN DOMAIN API PRODUKSI
        pathname: '/public/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com', // Izinkan placeholder
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;