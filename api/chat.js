export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  try {
    const { prompt } = req.body || {};
    if (!prompt) return res.status(400).json({ error: "Missing prompt" });

    const r = await fetch("https://unprimly-ecclesiologic-erwin.ngrok-free.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer anything"
      },
      body: JSON.stringify({
        model: "kimi-coding/k2p5",
        messages: [{role: "user", content: prompt}]
      })
    });

    const data = await r.json();
    if (!r.ok) return res.status(500).json({ error: data });

    const text = data.choices?.[0]?.message?.content || "(no response)";

    return res.status(200).json({ reply: text });
  } catch (e) {
    return res.status(500).json({ error: String(e) });
  }
}
