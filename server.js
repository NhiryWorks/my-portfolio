// server.js (ESM)
import express from "express";

const app = express();
app.use(express.json());

app.post("/api/contact", (req, res) => {
  console.log("[DEV] /api/contact reçu:", req.body);

  if (req.body?.website) {
    return res.status(400).json({ error: "Bot détecté" });
  }

  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "Champs manquants" });
  }

  return res.status(200).json({ ok: true, message: "Reçu (mode dev)" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ API dev sur http://localhost:${PORT}`);
});
