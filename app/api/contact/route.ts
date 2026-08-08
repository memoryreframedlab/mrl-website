import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

function escHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("[api/contact] RESEND_API_KEY is not set");
    return NextResponse.json({ error: "設定エラーが発生しました" }, { status: 500 });
  }

  let body: { name?: unknown; email?: unknown; subject?: unknown; message?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const name    = typeof body.name    === "string" ? body.name.trim()    : "";
  const email   = typeof body.email   === "string" ? body.email.trim()   : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  const atIdx = email.indexOf("@");
  if (!email || !(atIdx > 0 && email.indexOf(".", atIdx) > atIdx + 1)) {
    return NextResponse.json({ error: "有効なメールアドレスを入力してください" }, { status: 400 });
  }
  if (!name) {
    return NextResponse.json({ error: "お名前を入力してください" }, { status: 400 });
  }
  if (!message) {
    return NextResponse.json({ error: "お問い合わせ内容を入力してください" }, { status: 400 });
  }

  const from = process.env.RESEND_FROM ?? "Memory Reframed Lab <noreply@mail.littlehabits.jp>";
  const to   = "apr_25@icloud.com";
  const emailSubject = `【MRL】お問い合わせ${name ? ` — ${name}` : ""}${subject ? ` / ${subject}` : ""}`;

  const sentAt = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit", timeZone: "Asia/Tokyo",
  }).format(new Date()) + "（JST）";

  const eName    = escHtml(name);
  const eEmail   = escHtml(email);
  const eSubject = escHtml(subject || "（未入力）");
  const eMessage = escHtml(message).replace(/\n/g, "<br />");
  const eSentAt  = escHtml(sentAt);

  const gmailBody    = encodeURIComponent("お問い合わせありがとうございます。\nMemory Reframed Lab です。\n\n");
  const gmailSubject = encodeURIComponent(`Re: ${subject || "Memory Reframed Lab へのお問い合わせ"}`);
  const gmailParams  = `view=cm&fs=1&to=${encodeURIComponent(email)}&su=${gmailSubject}&body=${gmailBody}`;
  const gmailUrl     = escHtml(`https://mail.google.com/mail/?authuser=memoryreframedlab%40gmail.com&${gmailParams}`);

  const html = `<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8" /><title>お問い合わせ</title></head>
<body style="margin:0;padding:0;background:#f5f4f2;font-family:'Helvetica Neue',Arial,sans-serif;color:#1c1917;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">
        <tr><td style="padding-bottom:20px;text-align:center;">
          <p style="margin:0;font-size:11px;letter-spacing:0.22em;color:#a8a29e;">MEMORY REFRAMED LAB</p>
        </td></tr>
        <tr><td style="background:#ffffff;border-radius:12px;padding:36px 32px;box-shadow:0 1px 8px rgba(0,0,0,0.06);">
          <p style="margin:0 0 20px;font-size:16px;font-weight:700;color:#1c1917;">お問い合わせが届きました</p>
          <table width="100%" cellpadding="0" cellspacing="0"
            style="background:#f5f4f2;border-radius:8px;padding:16px 20px;margin-bottom:20px;">
            <tr><td style="font-size:11px;color:#a8a29e;padding-bottom:10px;">送信者情報</td></tr>
            <tr><td style="font-size:13px;color:#44403c;padding-bottom:6px;"><strong>名前：</strong>${eName}</td></tr>
            <tr><td style="font-size:13px;color:#44403c;padding-bottom:6px;"><strong>メール：</strong>${eEmail}</td></tr>
            <tr><td style="font-size:13px;color:#44403c;padding-bottom:6px;"><strong>件名：</strong>${eSubject}</td></tr>
            <tr><td style="font-size:13px;color:#44403c;"><strong>送信日時：</strong>${eSentAt}</td></tr>
          </table>
          <p style="margin:0 0 8px;font-size:11px;color:#a8a29e;">お問い合わせ内容</p>
          <p style="margin:0 0 28px;font-size:14px;color:#1c1917;line-height:1.8;">${eMessage}</p>
          <table width="100%" cellpadding="0" cellspacing="0"
            style="background:#fafaf9;border:1px solid #e7e5e4;border-radius:8px;padding:20px;margin-bottom:16px;">
            <tr><td style="text-align:center;">
              <p style="margin:0 0 6px;font-size:11px;color:#a8a29e;">返信先</p>
              <p style="margin:0 0 14px;font-size:18px;font-weight:700;color:#1c1917;word-break:break-all;">${eEmail}</p>
              <a href="mailto:${eEmail}"
                style="display:inline-block;background:#1c1917;color:#ffffff;font-size:13px;font-weight:600;
                       text-decoration:none;padding:10px 24px;border-radius:6px;">
                メールを作成する
              </a>
            </td></tr>
          </table>
          <p style="margin:0 0 12px;text-align:center;">
            <a href="${gmailUrl}"
              style="font-size:12px;color:#78716c;text-decoration:none;
                     padding:8px 18px;border:1px solid #e7e5e4;border-radius:6px;display:inline-block;">
              Gmail（memoryreframedlab）で開く
            </a>
          </p>
        </td></tr>
        <tr><td style="padding-top:20px;text-align:center;">
          <p style="margin:0;font-size:11px;color:#a8a29e;">Memory Reframed Lab</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = [
    "【MRL】お問い合わせ",
    "",
    `名前：${name}`,
    `メール：${email}`,
    `件名：${subject || "（未入力）"}`,
    `送信日時：${sentAt}`,
    "",
    "お問い合わせ内容：",
    message,
  ].join("\n");

  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from,
      to:      [to],
      replyTo: email,
      subject: emailSubject,
      html,
      text,
    });
    if (error) {
      console.error("[api/contact] Resend error:", error);
      return NextResponse.json({ error: "送信に失敗しました。しばらくしてから再試行してください。" }, { status: 500 });
    }
    console.log(`[api/contact] Contact email sent from ${email}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/contact] Error:", err);
    return NextResponse.json({ error: "送信に失敗しました。しばらくしてから再試行してください。" }, { status: 500 });
  }
}
