import { Router } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { Order } from '../models/Order';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2020-08-27'
});
const router = Router();

// Create PaymentIntent
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur'
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Webhook handler
router.post(
  '/webhooks/stripe',
  bodyParser.raw({ type: 'application/json' }),
  (req, res) => {
    const sig = req.headers['stripe-signature'] as string;
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err: any) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'payment_intent.succeeded') {
      const pi = event.data.object as Stripe.PaymentIntent;
      // TODO: lookup Order by metadata and update status
    }

    res.json({ received: true });
  }
);

export default router;
