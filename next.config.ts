import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["i.pinimg.com"],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        destination: "https://uttarakhandtravelss.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.uttarakhandtravelss.com" }],
        destination: "https://uttarakhandtravelss.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
