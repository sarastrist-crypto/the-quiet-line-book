export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  try {
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${process.env.VITE_KIT_FORM_ID}/subscribe`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: process.env.VITE_KIT_API_KEY,
          email: email.trim().toLowerCase(),
        }),
      }
    );

    if (!response.ok) {
      return res.status(400).json({ error: 'Subscription failed' });
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
