import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import api from '../utils/api';
export default function PaymentForm({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error,setError] = useState<string|null>(null);
  const [processing,setProcessing] = useState(false);
  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault(); if (!stripe||!elements) return;
    setProcessing(true);
    const { data } = await api.post('/payments/create-payment-intent',{ amount:Math.round(amount*100) });
    const result = await stripe.confirmCardPayment(data.clientSecret,{ payment_method:{ card:elements.getElement(CardElement)! }});
    if (result.error) setError(result.error.message!);
    else if (result.paymentIntent.status==='succeeded') window.location.href='/orders';
    setProcessing(false);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-2 border" />
      {error && <p className="text-red-600">{error}</p>}
      <button type="submit" disabled={!stripe||processing} className="w-full bg-blue-600 text-white p-2">
        {processing ? 'Processing…' : `Pay €${amount.toFixed(2)}`}
      </button>
    </form>
  );
}