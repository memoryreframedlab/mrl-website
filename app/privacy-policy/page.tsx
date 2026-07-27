import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "Memory Reframed Lab のプライバシーポリシー。",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-xs font-semibold text-stone-400 tracking-widest uppercase mb-6">
        Privacy Policy
      </p>
      <h1 className="text-2xl font-bold tracking-tight text-stone-900 mb-8">
        プライバシーポリシー
      </h1>

      <div className="space-y-8 text-sm text-stone-700 leading-relaxed">
        <section>
          <h2 className="font-semibold text-stone-900 mb-2">個人情報の取り扱いについて</h2>
          <p>
            Memory Reframed Lab（以下「当スタジオ」）は、お問い合わせの際にいただく氏名・メールアドレス等の個人情報を、ご返答の目的のみに使用します。第三者への提供は行いません。
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-stone-900 mb-2">アクセス解析について</h2>
          <p>
            当サイトでは、Google アナリティクス等のアクセス解析ツールを使用する場合があります。これらのツールはクッキーを使用し、個人を特定しない形でアクセス情報を収集します。
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-stone-900 mb-2">Google AdSense について</h2>
          <p>
            当サイトおよび運営する一部サービスでは、Google AdSense による広告を表示する場合があります。Google AdSense は広告配信のためにクッキーを使用し、ユーザーの興味に基づく広告を表示します。詳細は{" "}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-stone-900"
            >
              Google の広告ポリシー
            </a>
            をご参照ください。
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-stone-900 mb-2">免責事項</h2>
          <p>
            当サイトの情報は正確を期しておりますが、内容の完全性・正確性を保証するものではありません。当サイトのご利用により生じた損害について、当スタジオは責任を負いません。
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-stone-900 mb-2">お問い合わせ</h2>
          <p>
            プライバシーポリシーに関するご質問は、
            <a href="/contact" className="underline underline-offset-2 hover:text-stone-900 ml-1">
              お問い合わせフォーム
            </a>
            よりご連絡ください。
          </p>
        </section>

        <p className="text-stone-400 text-xs pt-4 border-t border-stone-100">
          制定日：2025年1月1日
        </p>
      </div>
    </div>
  );
}
