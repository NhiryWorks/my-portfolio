// api/contact.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, subject, message, website } = req.body || {};

    if (website && website.trim() !== "") {
      return res.status(200).json({ ok: true });
    }
    if (!name?.trim()) return res.status(400).json({ error: "Nom requis" });
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return res.status(400).json({ error: "Email invalide" });
    if (!subject?.trim())
      return res.status(400).json({ error: "Sujet requis" });
    if (!message?.trim() || message.trim().length < 10)
      return res
        .status(400)
        .json({ error: "Message trop court (≥10 caractères)" });

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey)
      return res.status(500).json({ error: "RESEND_API_KEY manquant" });

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio de Nhiry <onboarding@resend.dev>", // ok pour démarrer
        to: ["nhirlanto@gmail.com"], // <-- ton adresse
        reply_to: email,
        subject: `[Contact] ${subject}`.slice(0, 120),
        text: `De: ${name} <${email}>\nSujet: ${subject}\n\n${message}`,
        html: `
          <h2>Nouveau message de ton portfolio</h2>
          <p><strong>De:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
          <p><strong>Sujet:</strong> ${escapeHtml(subject)}</p>
          <pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(message)}</pre>
        `,
      }),
    });

    if (!resp.ok) {
      const data = await resp.json().catch(() => null);
      return res
        .status(502)
        .json({ error: data?.message || "Échec envoi email" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erreur serveur lors de l'envoi" });
  }
}

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
