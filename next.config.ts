/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["i.pinimg.com"],
  },
  async rewrites() {
    return [
      { source: "/robots.txt", destination: "/robots" },
      { source: "/sitemap.xml", destination: "/sitemap" },
    ];
  },
};

module.exports = nextConfig;
