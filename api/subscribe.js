export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Vercel's Node runtime auto-parses JSON bodies, but fall back defensively.
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const email = body?.email;

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  // Try every env-var name that's ever been used for this integration,
  // so whichever set is valid wins.
  const apiKey =
    process.env.KIT_API_KEY ||
    process.env.VITE_KIT_API_KEY ||
    process.env.CONVERTKIT_API_KEY;
  const formId =
    process.env.KIT_FORM_ID ||
    process.env.VITE_KIT_FORM_ID ||
    process.env.CONVERTKIT_FORM_ID;

  if (!apiKey || !formId) {
    return res.status(500).json({
      error: 'KIT credentials not configured',
      detail: {
        apiKey: apiKey ? 'present' : 'missing',
        formId: formId ? 'present' : 'missing',
      },
    });
  }

  // v3 ConvertKit/Kit API — api_key goes in the JSON body.
  try {
    const kitResponse = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: apiKey,
          email: email.trim().toLowerCase(),
        }),
      }
    );

    const text = await kitResponse.text();
    let payload;
    try { payload = JSON.parse(text); } catch { payload = { raw: text }; }

    if (!kitResponse.ok) {
      console.error('Kit subscribe failed', kitResponse.status, payload);
      return res.status(kitResponse.status).json({
        error: 'Subscription failed',
        status: kitResponse.status,
        detail: payload,
      });
    }

    return res.status(200).json({ success: true, subscription: payload });
  } catch (error) {
    console.error('Subscribe handler error', error);
    return res.status(500).json({
      error: 'Something went wrong',
      detail: error?.message || String(error),
    });
  }
}
