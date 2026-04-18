import os
import stripe
import httpx
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")

app = FastAPI()

# Enable CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─── KIT / CONVERTKIT ────────────────────────────────────────────────────────

class SubscribeRequest(BaseModel):
    email: str

@app.post("/api/subscribe")
async def subscribe(item: SubscribeRequest):
    api_key = os.environ.get("VITE_KIT_API_KEY")
    form_id = os.environ.get("VITE_KIT_FORM_ID")

    if not api_key or not form_id:
        raise HTTPException(status_code=500, detail="KIT credentials not configured")

    if not item.email or "@" not in item.email:
        raise HTTPException(status_code=400, detail="A valid email is required")

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"https://api.convertkit.com/v3/forms/{form_id}/subscribe",
                json={
                    "api_key": api_key,
                    "email": item.email.strip().lower(),
                },
                headers={"Content-Type": "application/json"},
                timeout=10.0,
            )

        if response.status_code != 200:
            raise HTTPException(status_code=400, detail="Subscription failed")

        return {"success": True}

    except httpx.RequestError as e:
        raise HTTPException(status_code=500, detail="Something went wrong. Please try again.")


# ─── STRIPE ──────────────────────────────────────────────────────────────────

class CheckoutSessionRequest(BaseModel):
    price_id: str
    success_url: str
    cancel_url: str

@app.post("/api/create-checkout-session")
async def create_checkout_session(item: CheckoutSessionRequest):
    try:
        checkout_session = stripe.checkout.Session.create(
            line_items=[
                {
                    'price': item.price_id,
                    'quantity': 1,
                },
            ],
            mode='payment',
            success_url=item.success_url,
            cancel_url=item.cancel_url,
        )
        return {"url": checkout_session.url}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/api/webhook")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get("Stripe-Signature")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, os.environ.get("STRIPE_WEBHOOK_SECRET")
        )
    except ValueError:
        return {"status": "invalid payload"}
    except stripe.error.SignatureVerificationError:
        return {"status": "invalid signature"}

    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        print(f"Payment successful for session {session['id']}")

    return {"status": "success"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
