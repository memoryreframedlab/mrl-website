import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://memoryreframedlab.com"),
  title: {
    default: "Memory Reframed Lab",
    template: "%s | Memory Reframed Lab",
  },
  description: "Memory Reframed Lab — 記憶と習慣をデザインするプロダクトスタジオ。",
  openGraph: {
    siteName: "Memory Reframed Lab",
    locale: "ja_JP",
  },
  other: { "google-adsense-account": "ca-pub-4146788733785651" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" style={{ colorScheme: "light" }}>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4146788733785651"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-white text-stone-900 antialiased">
        <header className="border-b border-stone-200">
          <div className="mx-auto max-w-3xl px-6 py-4 flex items-center justify-between">
            <a href="/" className="font-semibold text-stone-900 tracking-tight">
              Memory Reframed Lab
            </a>
            <nav className="flex gap-6 text-sm text-stone-600">
              <a href="/about" className="hover:text-stone-900">About</a>
              <a href="/contact" className="hover:text-stone-900">Contact</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-stone-200 mt-24">
          <div className="mx-auto max-w-3xl px-6 py-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-500">
            <span>© 2025 Memory Reframed Lab</span>
            <a href="/privacy-policy" className="hover:text-stone-900">プライバシーポリシー</a>
            <a href="/contact" className="hover:text-stone-900">お問い合わせ</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
