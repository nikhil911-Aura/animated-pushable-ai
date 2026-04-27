import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RECIPIENT = "janvipatidar.ibrinfotech@gmail.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Body = {
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
  elapsedMs?: unknown;
};

type Clean = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
};

function sanitize(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  let out = "";
  for (let i = 0; i < v.length && out.length < max; i++) {
    const c = v.charCodeAt(i);
    if (c < 32 && c !== 9 && c !== 10 && c !== 13) continue;
    if (c === 127) continue;
    out += v[i];
  }
  return out.trim().slice(0, max);
}

function validate(body: Body): { ok: true; data: Clean } | { ok: false; error: string } {
  const fullName = sanitize(body.fullName, 120);
  const email    = sanitize(body.email,    200);
  const phone    = sanitize(body.phone,    40);
  const company  = sanitize(body.company,  160);
  const subject  = sanitize(body.subject,  200);
  const message  = sanitize(body.message,  4000);

  if (!fullName || fullName.length < 2) return { ok: false, error: "Invalid name" };
  if (!email || !EMAIL_RE.test(email))  return { ok: false, error: "Invalid email" };
  if (phone && !/^[+\d\s().-]{6,40}$/.test(phone)) return { ok: false, error: "Invalid phone" };
  if (!subject || subject.length < 3)   return { ok: false, error: "Invalid subject" };
  if (!message || message.length < 10)  return { ok: false, error: "Message too short" };

  return { ok: true, data: { fullName, email, phone, company, subject, message } };
}

const RATE_WINDOW_MS = 60_000;
const RATE_MAX       = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  return list.length > RATE_MAX;
}

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtml(d: Clean, meta: { ip: string; ua: string }): string {
  const row = (label: string, val: string) =>
    val
      ? `<tr>
          <td style="padding:10px 14px;background:#fafafa;border:1px solid #eee;font-size:12px;color:#666;width:160px;">${escapeHtml(label)}</td>
          <td style="padding:10px 14px;border:1px solid #eee;font-size:14px;color:#111;">${escapeHtml(val)}</td>
        </tr>`
      : "";

  return `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f4f4f5;font-family:Inter,Helvetica,Arial,sans-serif;">
  <table cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #eee;border-radius:12px;overflow:hidden;">
    <tr>
      <td style="padding:20px 24px;background:linear-gradient(135deg,#E8001D,#FF2D42);color:#fff;">
        <div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;opacity:.85;">Pushable AI - Contact form</div>
        <div style="font-size:20px;font-weight:700;margin-top:4px;">New message from ${escapeHtml(d.fullName)}</div>
      </td>
    </tr>
    <tr><td style="padding:20px 24px;">
      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
        ${row("Full Name", d.fullName)}
        ${row("Email",     d.email)}
        ${row("Phone",     d.phone)}
        ${row("Company",   d.company)}
        ${row("Subject",   d.subject)}
      </table>
      <div style="margin-top:18px;font-size:12px;color:#666;text-transform:uppercase;letter-spacing:.1em;">Message</div>
      <div style="margin-top:6px;padding:14px 16px;background:#fafafa;border:1px solid #eee;border-radius:8px;font-size:14px;line-height:1.55;color:#111;white-space:pre-wrap;">${escapeHtml(d.message)}</div>
    </td></tr>
    <tr><td style="padding:14px 24px;background:#fafafa;border-top:1px solid #eee;font-size:11px;color:#999;">
      Submitted ${new Date().toUTCString()} - IP ${escapeHtml(meta.ip)} - ${escapeHtml(meta.ua).slice(0, 200)}
    </td></tr>
  </table>
</body></html>`;
}

function buildText(d: Clean): string {
  return [
    `New contact form submission`,
    ``,
    `Full Name : ${d.fullName}`,
    `Email     : ${d.email}`,
    d.phone   ? `Phone     : ${d.phone}`   : null,
    d.company ? `Company   : ${d.company}` : null,
    `Subject   : ${d.subject}`,
    ``,
    `Message:`,
    d.message,
  ].filter(Boolean).join("\n");
}

function buildTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("SMTP is not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS in environment.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.trim() !== "") {
    return Response.json({ ok: true }, { status: 200 });
  }

  const elapsed = typeof body.elapsedMs === "number" ? body.elapsedMs : Number.MAX_SAFE_INTEGER;
  if (elapsed < 1500) {
    return Response.json({ ok: true }, { status: 200 });
  }

  const ip = clientIp(req);
  if (rateLimited(ip)) {
    return Response.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 },
    );
  }

  const v = validate(body);
  if (!v.ok) return Response.json({ error: v.error }, { status: 400 });

  const data = v.data;
  const ua = req.headers.get("user-agent") ?? "unknown";

  let transport: nodemailer.Transporter;
  try {
    transport = buildTransport();
  } catch (err) {
    console.error("[contact] SMTP config error:", err);
    return Response.json(
      { error: "Mail service is not configured." },
      { status: 500 },
    );
  }

  const from = process.env.MAIL_FROM ?? `Pushable AI Contact <${process.env.SMTP_USER}>`;

  try {
    await transport.sendMail({
      from,
      to: RECIPIENT,
      replyTo: `${data.fullName} <${data.email}>`,
      subject: `[Contact] ${data.subject}`,
      text: buildText(data),
      html: buildHtml(data, { ip, ua }),
    });
  } catch (err) {
    console.error("[contact] sendMail failed:", err);
    return Response.json(
      { error: "We couldn't send your message. Please try again shortly." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true }, { status: 200 });
}

export function GET() {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}
