import os
import stripe
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
    allow_origins=["*"],  # In production, specify your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    except ValueError as e:
        return {"status": "invalid payload"}
    except stripe.error.SignatureVerificationError as e:
        return {"status": "invalid signature"}

    # Handle the checkout.session.completed event
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        # TODO: Trigger email delivery of the book or notify shipping
        print(f"Payment successful for session {session['id']}")

    return {"status": "success"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
