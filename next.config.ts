import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {
    domains: ["i.pinimg.com"],
  },
  async redirects() {
    return [
      {
        source: "/(.*)",
        has: [{ type: "host", value: "uttarakhandtravelss.com" }],
        destination: "https://www.uttarakhandtravelss.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
