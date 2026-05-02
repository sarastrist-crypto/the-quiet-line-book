// api/subscribe.js — Vercel serverless function
// Subscribes an email to ConvertKit form 9341548 (The Quiet Line)
// Required env var: CONVERTKIT_API_KEY (set in Vercel dashboard, never in code)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  if (!process.env.CONVERTKIT_API_KEY) {
    console.error('CONVERTKIT_API_KEY is not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const response = await fetch(
      'https://api.convertkit.com/v3/forms/9341548/subscribe',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: process.env.CONVERTKIT_API_KEY,
          email,
        }),
      }
    );

    const payload = await response.json();

    if (!response.ok) {
      console.error('ConvertKit error:', payload);
      return res.status(400).json({
        error: payload.message || 'Subscription failed',
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
