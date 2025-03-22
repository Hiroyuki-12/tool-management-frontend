import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ 静的エクスポートを有効に
  output: "export",

  // ✅ ESLintのエラーをビルド時は無視する設定（未使用変数などで止まらない）
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ 画像の外部読み込みを許可する設定（必要に応じて修正）
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",  // 例：S3やCloudFrontを使うならそのドメイン名に変更
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

