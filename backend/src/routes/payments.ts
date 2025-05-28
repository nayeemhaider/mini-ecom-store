import { Router } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { Order } from '../models/Order';

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2020-08-27' });
const router = Router();

// Create PaymentIntent
router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  const pi = await stripe.paymentIntents.create({ amount, currency: 'eur' });
  res.json({ clientSecret: pi.client_secret });
});

// Webhook handler
router.post('/webhooks/stripe', bodyParser.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'] as string;
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  if (event.type === 'payment_intent.succeeded') {
    const data = event.data.object as Stripe.PaymentIntent;
    // TODO: fulfill order in DB using metadata
  }
  res.json({ received: true });
});

export default router;