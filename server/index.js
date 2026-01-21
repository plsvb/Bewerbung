import 'dotenv/config';
import express from 'express';

const app = express();
const port = process.env.PORT || 5050;

app.use(express.json({ limit: '2mb' }));

app.post('/api/generate', async (req, res) => {
  const { model, inputs, parameters, apiKey } = req.body || {};

  if (!model || !inputs) {
    return res.status(400).json({ error: 'model und inputs sind erforderlich' });
  }

  const key = apiKey || process.env.HUGGINGFACE_API_KEY;
  if (!key) {
    return res.status(500).json({ error: 'HUGGINGFACE_API_KEY fehlt (Server) oder apiKey nicht gesendet' });
  }

  try {
    const response = await fetch(`https://router.huggingface.co/hf-inference/models/${model}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        'X-Wait-For-Model': 'true'
      },
      body: JSON.stringify({ inputs, parameters })
    });

    const text = await response.text();
    res.status(response.status);

    try {
      return res.json(JSON.parse(text));
    } catch {
      return res.send(text);
    }
  } catch (error) {
    return res.status(500).json({ error: 'Serverfehler', details: String(error) });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.get('/api/models', async (req, res) => {
  const params = new URLSearchParams(req.query);
  const url = `https://huggingface.co/api/models?${params.toString()}`;

  try {
    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    const text = await response.text();
    res.status(response.status);

    try {
      return res.json(JSON.parse(text));
    } catch {
      return res.send(text);
    }
  } catch (error) {
    return res.status(500).json({ error: 'Serverfehler', details: String(error) });
  }
});

app.listen(port, () => {
  console.log(`API Proxy läuft auf http://localhost:${port}`);
});
