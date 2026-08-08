"use client";

import { useState } from "react";

function isValidEmail(email: string): boolean {
  const at = email.indexOf("@");
  return at > 0 && email.indexOf(".", at) > at + 1;
}

type State = "idle" | "submitting" | "done" | "error";

export default function ContactPage() {
  const [name,         setName]         = useState("");
  const [email,        setEmail]        = useState("");
  const [subject,      setSubject]      = useState("");
  const [message,      setMessage]      = useState("");
  const [nameTouched,  setNameTouched]  = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [msgTouched,   setMsgTouched]   = useState(false);
  const [state,        setState]        = useState<State>("idle");
  const [errMsg,       setErrMsg]       = useState("");

  const nameInvalid  = nameTouched  && !name.trim();
  const emailInvalid = emailTouched && !isValidEmail(email);
  const msgInvalid   = msgTouched   && !message.trim();
  const canSubmit    = !!name.trim() && isValidEmail(email) && !!message.trim() && state === "idle";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setState("submitting");
    setErrMsg("");

    try {
      const res  = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json() as { ok?: boolean; error?: string };
      if (!res.ok) {
        setErrMsg(data.error ?? "送信に失敗しました");
        setState("error");
      } else {
        setState("done");
        setName(""); setEmail(""); setSubject(""); setMessage("");
        setNameTouched(false); setEmailTouched(false); setMsgTouched(false);
      }
    } catch {
      setErrMsg("接続に失敗しました。もう一度お試しください。");
      setState("error");
    }
  }

  const baseInput =
    "w-full px-4 py-3 text-sm text-stone-900 bg-white border rounded-md outline-none " +
    "focus:ring-2 focus:ring-stone-400 focus:border-transparent transition";

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-xs font-semibold text-stone-400 tracking-widest uppercase mb-6">
        Contact
      </p>
      <h1 className="text-2xl font-bold tracking-tight text-stone-900 mb-3">お問い合わせ</h1>
      <p className="text-stone-500 text-sm leading-relaxed mb-10">
        サービスへのご意見・ご質問・ご要望はこちらからお送りください。
      </p>

      {state === "done" ? (
        <div className="border border-stone-200 rounded-lg px-8 py-10 text-center bg-stone-50">
          <p className="font-semibold text-stone-900 mb-2">送信が完了しました</p>
          <p className="text-stone-500 text-sm leading-relaxed">
            お問い合わせありがとうございます。内容を確認後、ご返信いたします。
          </p>
          <button
            onClick={() => setState("idle")}
            className="mt-6 text-xs text-stone-400 hover:text-stone-700 underline underline-offset-2 transition-colors"
          >
            別のお問い合わせをする
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
          {/* お名前（必須） */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-stone-700">
              お名前<span className="ml-1 text-xs text-red-500">必須</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setNameTouched(true)}
              placeholder="例：山田 花子"
              className={`${baseInput} ${nameInvalid ? "border-red-300" : "border-stone-200"}`}
              autoComplete="name"
            />
            {nameInvalid && (
              <p className="text-xs text-red-500">お名前を入力してください</p>
            )}
          </div>

          {/* メールアドレス（必須） */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-stone-700">
              メールアドレス<span className="ml-1 text-xs text-red-500">必須</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              placeholder="your@email.com"
              className={`${baseInput} ${emailInvalid ? "border-red-300" : "border-stone-200"}`}
              autoComplete="email"
            />
            {emailInvalid && (
              <p className="text-xs text-red-500">有効なメールアドレスを入力してください</p>
            )}
          </div>

          {/* 件名（任意） */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-stone-700">
              件名<span className="ml-1 text-xs text-stone-400">任意</span>
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="例：Little Habits について"
              className={`${baseInput} border-stone-200`}
            />
          </div>

          {/* お問い合わせ内容（必須） */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-stone-700">
              お問い合わせ内容<span className="ml-1 text-xs text-red-500">必須</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onBlur={() => setMsgTouched(true)}
              rows={6}
              placeholder="ご質問・ご要望をご記入ください"
              className={`${baseInput} resize-y leading-relaxed ${msgInvalid ? "border-red-300" : "border-stone-200"}`}
            />
            {msgInvalid && (
              <p className="text-xs text-red-500">お問い合わせ内容を入力してください</p>
            )}
          </div>

          {/* エラー */}
          {state === "error" && errMsg && (
            <p className="text-sm text-red-500 text-center">{errMsg}</p>
          )}

          {/* 送信ボタン */}
          <button
            type="submit"
            disabled={!canSubmit}
            className={`w-full py-3 rounded-md text-sm font-semibold transition-colors ${
              canSubmit
                ? "bg-stone-900 text-white hover:bg-stone-700 cursor-pointer"
                : "bg-stone-100 text-stone-400 cursor-not-allowed"
            }`}
          >
            {state === "submitting" ? "送信しています…" : "送信"}
          </button>
        </form>
      )}
    </div>
  );
}
