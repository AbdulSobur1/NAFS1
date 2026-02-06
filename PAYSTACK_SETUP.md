# NAFS Paystack Integration Setup

## Quick Start

### 1. Get Your Paystack Keys

1. Go to [Paystack Dashboard](https://dashboard.paystack.com/)
2. Log in with your Paystack account
3. Navigate to **Settings** → **API Keys & Webhooks** → **API Keys**
4. Copy your **Secret Key** (starts with `sk_live_` or `sk_test_`)

### 2. Create `.env.local` File

In the root directory of your project, create a `.env.local` file:

```bash
PAYSTACK_SECRET_KEY=sk_live_your_actual_secret_key_here
NODE_ENV=production
```

Replace `sk_live_your_actual_secret_key_here` with your actual Paystack secret key.

### 3. Configure Webhook (Important!)

For Paystack to notify your app when payments are completed:

1. Log in to [Paystack Dashboard](https://dashboard.paystack.com/)
2. Go to **Settings** → **API Keys & Webhooks** → **Webhooks**
3. Set **Webhook URL** to your callback endpoint:
   - **Production:** `https://yourdomain.com/api/paystack-callback`
   - **Local Testing:** `http://localhost:3000/api/paystack-callback` (requires ngrok or similar)
4. Select **Events:** Check `charge.success`
5. Click **Save**

### 4. Test Locally

To test payments locally without a public URL:

**Option A: Using ngrok (recommended)**
```bash
# Install ngrok: https://ngrok.com/
ngrok http 3000

# Copy the URL (e.g., https://abc123.ngrok.io)
# Update Paystack webhook to: https://abc123.ngrok.io/api/paystack-callback
```

**Option B: Use Paystack Test Keys**
1. In Paystack Dashboard, switch to **Test Keys**
2. Copy the test `sk_test_...` key
3. Add to `.env.local`:
```
PAYSTACK_SECRET_KEY=sk_test_your_test_secret_key
```
4. Test payment flow with Paystack test card numbers (available in Paystack docs)

### 5. Run the App

```bash
npm run dev
# or
pnpm dev
```

### 6. Test Payment Flow

1. Go to `http://localhost:3000`
2. Click "Register" and choose a category
3. Fill in the registration form
4. Click "Proceed to Payment"
5. You'll be redirected to Paystack to complete the test payment
6. After payment, you'll be redirected back to confirmation page

## Integration Points

- **Registration Forms**: Direct redirect to Paystack after creating payment intent
- **Callback Endpoint**: `/api/paystack-callback` - receives Paystack webhook
- **Database**: Registrations stored in `.nafs-db/registrations.json`
- **Auth**: Created automatically for school registrations after payment

## Troubleshooting

**Payment not working?**
- Check that `PAYSTACK_SECRET_KEY` is set in `.env.local`
- Verify webhook URL is correct in Paystack Dashboard
- Check browser console for errors
- Look at server logs in terminal

**Webhook not triggering?**
- Make sure webhook URL is publicly accessible (use ngrok for local testing)
- Confirm `charge.success` event is selected in Paystack Dashboard
- Try payment again; webhook retries don't always work immediately

## Production Deployment

1. Get live Paystack keys (starts with `sk_live_`)
2. Set `PAYSTACK_SECRET_KEY` in your hosting platform's environment variables
3. Update webhook URL to your production domain
4. Test with a small payment before going live
