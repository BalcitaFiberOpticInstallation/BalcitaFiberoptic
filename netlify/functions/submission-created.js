const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  const payload = JSON.parse(event.body).payload;
  const { name, email } = payload.data;

  if (!email) return { statusCode: 200, body: 'No email to reply to.' };

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Balcita FiberOptics" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: 'We received your inquiry — Balcita FiberOptics',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333;">
        <div style="background:#111;padding:24px 32px;border-bottom:3px solid #f97316;">
          <h2 style="color:#f97316;margin:0;">Balcita FiberOptics</h2>
        </div>
        <div style="padding:32px;">
          <p>Hi <strong>${name}</strong>,</p>
          <p>Thank you for reaching out to us. We have received your inquiry and are currently reviewing the details of your request.</p>
          <p>Our team will get back to you within <strong>24 hours on business days</strong> with a detailed response.</p>
          <p style="margin-top:32px;">Best regards,<br/><strong>Balcita FiberOptics Team</strong><br/>+63 956 346 3938</p>
        </div>
        <div style="background:#f5f5f5;padding:16px 32px;font-size:12px;color:#999;text-align:center;">
          © ${new Date().getFullYear()} Balcita FiberOptics. All rights reserved.
        </div>
      </div>
    `,
  });

  return { statusCode: 200, body: 'Auto-reply sent.' };
};
