import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com", // ✅ ここにホストを追加
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
