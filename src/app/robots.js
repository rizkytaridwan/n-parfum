// src/app/robots.js
// Ganti sitemap URL dengan domain produksi Anda

export default function robots() {
  const sitemapUrl = process.env.NEXT_PUBLIC_SITE_URL ? `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml` : 'http://localhost:3000/sitemap.xml';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // disallow: '/private/', // Jika ada halaman admin
    },
    sitemap: sitemapUrl,
  };
}