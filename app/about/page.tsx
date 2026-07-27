import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Memory Reframed Lab について。",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-xs font-semibold text-stone-400 tracking-widest uppercase mb-6">About</p>
      <h1 className="text-2xl font-bold tracking-tight text-stone-900 mb-8">
        Memory Reframed Lab について
      </h1>

      <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed space-y-6 text-sm">
        <p>
          Memory Reframed Lab は、日常の中にある「大切なもの」を記録・継承するためのプロダクトを開発する個人スタジオです。
        </p>
        <p>
          子育て・暮らし・記憶——忙しい毎日の中では、かけがえのない瞬間が流れていきます。
          私たちは、その瞬間を少しだけ立ち止まって残すための手段を作っています。
        </p>
        <p>
          凝った機能より、長く使えるシンプルさを。
          華やかなデザインより、手に取りやすい誠実さを。
          そういうプロダクトを、小さく丁寧に作っています。
        </p>

        <div className="border-t border-stone-200 pt-8 mt-8">
          <h2 className="text-base font-semibold text-stone-900 mb-4">運営者情報</h2>
          <dl className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:gap-8">
              <dt className="text-stone-500 min-w-28">屋号</dt>
              <dd className="text-stone-900">Memory Reframed Lab</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-8">
              <dt className="text-stone-500 min-w-28">所在地</dt>
              <dd className="text-stone-900">日本</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-8">
              <dt className="text-stone-500 min-w-28">お問い合わせ</dt>
              <dd className="text-stone-900">
                <a href="/contact" className="underline underline-offset-2 hover:text-stone-600">
                  お問い合わせフォーム
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
