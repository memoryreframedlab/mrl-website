import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Memory Reframed Lab へのお問い合わせ。",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-xs font-semibold text-stone-400 tracking-widest uppercase mb-6">Contact</p>
      <h1 className="text-2xl font-bold tracking-tight text-stone-900 mb-4">お問い合わせ</h1>
      <p className="text-stone-600 text-sm leading-relaxed mb-10">
        サービスへのご意見・ご質問・ご要望は、以下のメールアドレスまでお気軽にご連絡ください。
      </p>

      <div className="bg-stone-50 rounded-lg px-6 py-8 border border-stone-200">
        <p className="text-xs text-stone-500 mb-2">メールアドレス</p>
        <p className="text-stone-900 font-medium">
          <a href="mailto:apr_25@icloud.com" className="hover:underline">
            apr_25@icloud.com
          </a>
        </p>
      </div>

      <p className="text-stone-500 text-xs mt-6 leading-relaxed">
        ご返信にはお時間をいただく場合があります。あらかじめご了承ください。
      </p>
    </div>
  );
}
