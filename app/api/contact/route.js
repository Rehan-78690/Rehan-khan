import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, subject = "(no subject)", message, website } = await req.json();
    if (website) return NextResponse.json({ ok: true }); // honeypot

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for others
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const to = process.env.TO_EMAIL || process.env.SMTP_USER;
    const from = process.env.FROM_EMAIL || process.env.SMTP_USER;

    const html = `
      <div style="font-family: ui-sans-serif, system-ui; line-height:1.6;">
        <h2 style="margin:0 0 12px;">New message from your portfolio</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space:pre-wrap;background:#0f1115;color:#e5e7eb;padding:12px;border-radius:8px;">${escapeHtml(message)}</pre>
      </div>
    `;

    await transporter.sendMail({
      from,
      to,
      subject: `Portfolio message — ${subject} (${name})`,
      replyTo: email,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact error", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}

function escapeHtml(s = "") {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
