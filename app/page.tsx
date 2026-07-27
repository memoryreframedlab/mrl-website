import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Memory Reframed Lab",
  description: "記憶と習慣をデザインするプロダクトスタジオ。",
};

const services = [
  {
    name: "Little Habits",
    tagline: "小さな習慣を、大切な記念に。",
    description:
      "子どもとの日常の記録を、成長のフォトブックへ。毎日のちょっとした観察を積み重ね、かけがえのない一冊を作ります。",
    url: "https://littlehabits.jp",
    label: "littlehabits.jp",
    status: "提供中",
  },
  {
    name: "Lanternpost",
    tagline: "記憶を手紙にして、未来へ届ける。",
    description:
      "大切な人への言葉を、指定した日付に届ける手紙サービス。将来の自分や子どもへのメッセージを今日綴ります。",
    url: "https://lanternpost.jp",
    label: "lanternpost.jp",
    status: "開発中",
  },
  {
    name: "有難う図鑑",
    tagline: "今では当たり前にあるものの、知らなかった話。",
    description:
      "水道・電気・冷蔵庫……当たり前すぎて気づかない発明の歴史を、毎日一つ届けるメディア。",
    url: "https://arigatou.memoryreframedlab.com",
    label: "arigatou.memoryreframedlab.com",
    status: "提供中",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      {/* Hero */}
      <section className="mb-20">
        <p className="text-sm font-medium text-stone-400 mb-3 tracking-widest uppercase">
          Memory Reframed Lab
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 mb-5 leading-snug">
          記憶と習慣をデザインする<br />プロダクトスタジオ
        </h1>
        <p className="text-stone-600 leading-relaxed max-w-xl">
          Memory Reframed Lab は、日常の中にある「大切なもの」を記録・継承するためのプロダクトを開発しています。
          子育て・暮らし・記憶にまつわる小さな体験を、長く残る形に変えることを目指しています。
        </p>
      </section>

      {/* Services */}
      <section className="mb-20">
        <h2 className="text-xs font-semibold text-stone-400 tracking-widest uppercase mb-8">
          Services
        </h2>
        <div className="flex flex-col gap-10">
          {services.map((s) => (
            <div key={s.name} className="border-l-2 border-stone-200 pl-6">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-semibold text-stone-900 text-lg">{s.name}</h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    s.status === "提供中"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-stone-100 text-stone-500"
                  }`}
                >
                  {s.status}
                </span>
              </div>
              <p className="text-sm text-stone-500 mb-2">{s.tagline}</p>
              <p className="text-stone-600 text-sm leading-relaxed mb-3">{s.description}</p>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-stone-400 hover:text-stone-900 underline underline-offset-2"
              >
                {s.label} →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section>
        <h2 className="text-xs font-semibold text-stone-400 tracking-widest uppercase mb-4">
          Contact
        </h2>
        <p className="text-stone-600 text-sm leading-relaxed mb-4">
          サービスに関するお問い合わせ・ご意見は、お問い合わせフォームよりご連絡ください。
        </p>
        <a
          href="/contact"
          className="inline-block text-sm font-medium text-stone-900 border border-stone-300 rounded px-4 py-2 hover:bg-stone-50"
        >
          お問い合わせ →
        </a>
      </section>
    </div>
  );
}
