import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message, website } = req.body || {};

    // Anti spam — honeypot
    if (website) {
      return res.status(400).json({ success: false, message: 'Requête invalide.' });
    }

    // Validation champs
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Tous les champs sont obligatoires !' });
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Email invalide !' });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `[Contact] ${subject}`,
      html: `
        <h3>Nouveau message</h3>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Message :</strong><br>
        ${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: '✅ Message envoyé avec succès !' });
  } catch (error) {
    console.error('Erreur mail :', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
}
