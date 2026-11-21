import nodemailer, { type Transporter } from "nodemailer";
import type { TransportOptions } from "nodemailer";

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
  throw new Error("GMAIL_USER and GMAIL_APP_PASSWORD environment variables must be defined");
}

const transportOptions = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
} as TransportOptions;

let transporter: Transporter | null = null;

export function getTransporter(): Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport(transportOptions);
  }
  return transporter;
}

export async function sendVerificationEmail({
  to,
  url,
}: {
  to: string;
  url: string;
}): Promise<void> {
  const transport = getTransporter();

  await transport.sendMail({
    from: `"CodePath" <${GMAIL_USER}>`,
    to,
    subject: "Verify your email address - CodePath",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="color-scheme" content="light dark" />
          <title>Verify your email - CodePath</title>
        </head>
        <body style="margin:0; padding:0; font-family:'Noto Sans Bengali', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background:#f3f4f6; color:#111827; line-height:1.6;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; margin:0 auto; padding:40px 20px; background:#ffffff; border:1px solid #e5e7eb; border-radius:12px;">
            <tr>
              <td align="center" style="padding-bottom:32px;">
                <div style="width:48px; height:48px; border-radius:12px; background:linear-gradient(135deg, #a78bfa, #38bdf8); display:inline-flex; align-items:center; justify-content:center;">
                  <span style="font-size:24px;">🗺️</span>
                </div>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-bottom:24px;">
                <h1 style="margin:0; font-size:28px; font-weight:700; color:#111827; letter-spacing:-0.02em;">
                  Verify your email
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding-bottom:24px; font-size:16px; color:#111827; text-align:center;">
                <p style="margin:0 0 16px 0;">
                  Welcome to CodePath! Please verify your email address to activate your account and start tracking your roadmap progress.
                </p>
                <p style="margin:0 0 16px 0;">
                  CodePath-এ আপনাকে স্বাগত। আপনার অ্যাকাউন্ট সক্রিয় করতে এবং রোডম্যাপ অগ্রগতি ট্র্যাক করতে শুরু করার জন্য ইমেইল ঠিকানা যাচাই করুন।
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-bottom:32px;">
                <a href="${url}" style="display:inline-block; padding:14px 32px; font-size:16px; font-weight:600; color:#ffffff; background:#2563eb; border-radius:10px; text-decoration:none; border:none;">
                  Verify my email
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding-bottom:24px; font-size:14px; color:#4b5563; text-align:center;">
                <p style="margin:0 0 8px 0;">
                  This verification link will expire. If you did not request this email, you can safely ignore it.
                </p>
                <p style="margin:0;">
                  এই যাচাইকরণ লিঙ্কের মেয়াদ শেষ হবে। আপনি যদি এই ইমেইল অনুরোধ না করে থাকেন, তবে এটি উপেক্ষা করতে পারেন।
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-top:32px; border-top:1px solid #e5e7eb; font-size:12px; color:#6b7280; text-align:center;">
                <p style="margin:0;">
                  CodePath — Find Your Tech Career<br/>
                  If you have any questions, reply to this email.
                </p>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
    text: `
Verify your email - CodePath

Welcome to CodePath! Please verify your email address to activate your account and start tracking your roadmap progress.

Verification link: ${url}

This verification link will expire. If you did not request this email, you can safely ignore it.

CodePath — Find Your Tech Career
    `,
  });
}
