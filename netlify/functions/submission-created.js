const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  const payload = JSON.parse(event.body).payload;
  const { name, email, projectType } = payload.data;

  if (!email) return { statusCode: 200, body: 'No email to reply to.' };

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"BALCITA Fiber Optic Installation Services" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: 'We Received Your Inquiry — BALCITA Fiber Optic Installation Services',
    html: `
      <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:620px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <div style="background:#0f1117;padding:32px 40px;text-align:center;">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#f97316;">Fiber Optic &amp; Network Infrastructure</p>
          <h1 style="margin:0;font-size:22px;font-weight:800;color:#ffffff;letter-spacing:0.01em;">BALCITA <span style="color:#f97316;">Fiber Optic</span> Installation Services</h1>
          <div style="margin-top:16px;height:3px;background:linear-gradient(90deg,#f97316,#ea580c);border-radius:2px;"></div>
        </div>

        <!-- Body -->
        <div style="padding:40px;">
          <p style="margin:0 0 8px;font-size:18px;font-weight:700;color:#111827;">Hi ${name},</p>
          <p style="margin:0 0 24px;font-size:14px;color:#6b7280;">Thank you for contacting us.</p>

          <div style="background:#fff7ed;border-left:4px solid #f97316;border-radius:8px;padding:20px 24px;margin-bottom:28px;">
            <p style="margin:0;font-size:14px;color:#374151;line-height:1.7;">
              We have successfully received your inquiry${projectType ? ` regarding <strong>${projectType}</strong>` : ''} and our team is currently reviewing the details of your request.
            </p>
          </div>

          <p style="font-size:14px;color:#374151;line-height:1.7;margin:0 0 28px;">
            We will get back to you within <strong style="color:#f97316;">24 hours on business days</strong> with a detailed response. If you have any urgent concerns, feel free to reach us directly.
          </p>

          <!-- Contact Info -->
          <div style="background:#f9fafb;border-radius:10px;padding:20px 24px;margin-bottom:32px;">
            <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af;">Contact Us Directly</p>
            <p style="margin:0 0 6px;font-size:13px;color:#374151;">📞 &nbsp;+63 956 346 3938</p>
            <p style="margin:0 0 6px;font-size:13px;color:#374151;">📧 &nbsp;joseph.balcita@yahoo.com</p>
            <p style="margin:0;font-size:13px;color:#374151;">🕐 &nbsp;Mon – Sat, 8:00 AM – 6:00 PM</p>
          </div>

          <p style="margin:0;font-size:14px;color:#374151;">Best regards,<br/>
            <strong style="color:#111827;">BALCITA Fiber Optic Installation Services Team</strong>
          </p>
        </div>

        <!-- Footer -->
        <div style="background:#0f1117;padding:20px 40px;text-align:center;">
          <p style="margin:0 0 4px;font-size:12px;color:#6b7280;">Nationwide Coverage: Luzon, Visayas, and Mindanao</p>
          <p style="margin:0;font-size:11px;color:#374151;">© ${new Date().getFullYear()} BALCITA Fiber Optic Installation Services. All rights reserved.</p>
        </div>

      </div>
    `,
  });

  return { statusCode: 200, body: 'Auto-reply sent.' };
};
