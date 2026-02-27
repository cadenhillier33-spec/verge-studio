import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, business, email, phone, message } = req.body;

  if (!name || !business || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await resend.emails.send({
      from: 'Verge Studio <onboarding@resend.dev>',
      to: ['cadenhillier@icloud.com', 'cadenhillier33@gmail.com'],
      subject: `New lead: ${name} — ${business}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;">
          <h2 style="color:#C4622D;margin-bottom:24px;">New Verge Studio Lead</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:600;color:#333;width:140px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #eee;color:#555;">${name}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:600;color:#333;">Business</td><td style="padding:10px 0;border-bottom:1px solid #eee;color:#555;">${business}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:600;color:#333;">Email</td><td style="padding:10px 0;border-bottom:1px solid #eee;color:#555;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:600;color:#333;">Phone</td><td style="padding:10px 0;border-bottom:1px solid #eee;color:#555;">${phone || 'Not provided'}</td></tr>
            <tr><td style="padding:10px 0;font-weight:600;color:#333;vertical-align:top;">Message</td><td style="padding:10px 0;color:#555;">${message || 'No message'}</td></tr>
          </table>
          <div style="margin-top:32px;padding:16px;background:#FFF7F4;border-left:3px solid #C4622D;font-size:14px;color:#888;">
            Submitted via vergestudio.com contact form
          </div>
        </div>
      `
    });

    await resend.emails.send({
      from: 'Verge Studio <onboarding@resend.dev>',
      to: '2036714631@vtext.com',
      subject: '',
      text: `New Verge lead: ${name}, ${business}. Email: ${email}. Phone: ${phone || 'none'}.`
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Failed to send' });
  }
}
