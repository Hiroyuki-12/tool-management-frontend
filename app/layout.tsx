import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "道具管理アプリ",
  description: "道具を管理するアプリです。",
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <nav className="flex justify-between p-4 bg-gray-200">
          <a href="/tools" className="text-blue-500">ホーム</a>  {/* ← 修正済み */}
          <a href="/add-tool" className="text-blue-500">道具を追加</a>
        </nav>
        <div className="max-w-4xl mx-auto">{children}</div>
      </body>
    </html>
  );
}
