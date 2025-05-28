import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../contexts/AuthContext';
import { CartProvider } from '../contexts/CartContext';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '../utils/stripe';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <Elements stripe={stripePromise}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Elements>
      </CartProvider>
    </AuthProvider>
  );
}