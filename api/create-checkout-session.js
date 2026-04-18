// Create a Stripe Checkout session for the signed edition.
// Uses Stripe's REST API directly (no SDK = no package.json changes).
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  const priceId =
    process.env.STRIPE_PRICE_ID ||
    process.env.VITE_STRIPE_PRICE_ID;

  if (!secret || !priceId) {
    return res.status(500).json({
      error: 'Stripe not configured',
      detail: {
        secret: secret ? 'present' : 'missing',
        priceId: priceId ? 'present' : 'missing',
      },
    });
  }

  // Origin is where the browser made the request. Success and cancel URLs
  // need to be absolute; we derive them from that so the same code runs on
  // quietlinebook.com, www.quietlinebook.com, and the preview domains.
  const origin =
    req.headers.origin ||
    (req.headers.referer ? new URL(req.headers.referer).origin : null) ||
    'https://quietlinebook.com';

  const params = new URLSearchParams();
  params.set('mode', 'payment');
  params.append('line_items[0][price]', priceId);
  params.append('line_items[0][quantity]', '1');
  params.set('success_url', `${origin}/?purchase=success&session={CHECKOUT_SESSION_ID}`);
  params.set('cancel_url', `${origin}/?purchase=canceled`);
  params.set('allow_promotion_codes', 'true');

  // Physical book — collect shipping.
  // Expand the country list whenever you're ready to ship further.
  params.append('shipping_address_collection[allowed_countries][]', 'US');
  params.append('shipping_address_collection[allowed_countries][]', 'CA');

  // Optional: capture a phone number for shipping logistics.
  params.set('phone_number_collection[enabled]', 'true');

  try {
    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const text = await stripeResponse.text();
    let payload;
    try { payload = JSON.parse(text); } catch { payload = { raw: text }; }

    if (!stripeResponse.ok) {
      console.error('Stripe checkout session failed', stripeResponse.status, payload);
      return res.status(stripeResponse.status).json({
        error: 'Stripe error',
        status: stripeResponse.status,
        detail: payload?.error || payload,
      });
    }

    return res.status(200).json({ url: payload.url, sessionId: payload.id });
  } catch (error) {
    console.error('Checkout handler error', error);
    return res.status(500).json({
      error: 'Checkout session failed',
      detail: error?.message || String(error),
    });
  }
}
