import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import nodemailer from 'nodemailer';

// Endpoint /api/contact pour le serveur de dev local (en prod c'est api/contact.js sur Vercel)
function contactApiPlugin(env) {
  return {
    name: 'contact-api-dev',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        if (req.method !== 'POST') {
          res.statusCode = 405;
          return res.end(JSON.stringify({ success: false, message: 'Method not allowed' }));
        }

        let body = '';
        for await (const chunk of req) body += chunk;

        try {
          const { name, email, subject, message, website } = JSON.parse(body || '{}');

          if (website) {
            res.statusCode = 400;
            return res.end(JSON.stringify({ success: false, message: 'Requête invalide.' }));
          }
          if (!name || !email || !subject || !message) {
            res.statusCode = 400;
            return res.end(JSON.stringify({ success: false, message: 'Tous les champs sont obligatoires !' }));
          }
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            res.statusCode = 400;
            return res.end(JSON.stringify({ success: false, message: 'Email invalide !' }));
          }
          if (!env.EMAIL_USER || !env.EMAIL_PASS) {
            res.statusCode = 500;
            return res.end(JSON.stringify({ success: false, message: 'Service email non configuré (EMAIL_USER / EMAIL_PASS).' }));
          }

          const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: { user: env.EMAIL_USER, pass: env.EMAIL_PASS }
          });

          await transporter.sendMail({
            from: `"${name}" <${env.EMAIL_USER}>`,
            replyTo: email,
            to: env.EMAIL_USER,
            subject: `[Contact] ${subject}`,
            html: `
              <h3>Nouveau message</h3>
              <p><strong>Nom :</strong> ${name}</p>
              <p><strong>Email :</strong> ${email}</p>
              <p><strong>Message :</strong><br>${message}</p>
            `
          });

          res.statusCode = 200;
          res.end(JSON.stringify({ success: true, message: 'Message envoyé avec succès !' }));
        } catch (err) {
          console.error('Erreur API contact (dev) :', err);
          res.statusCode = 500;
          res.end(JSON.stringify({ success: false, message: 'Erreur serveur. Réessayez plus tard.' }));
        }
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), contactApiPlugin(env)]
  };
});
