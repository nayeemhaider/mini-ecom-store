import ProtectedRoute from '../components/ProtectedRoute';
import { useCart } from '../contexts/CartContext';
import PaymentForm from '../components/PaymentForm';

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const total = items.reduce((sum,i)=>sum+i.unitPrice*i.quantity,0);
  return (<ProtectedRoute><div className="container mx-auto p-4 max-w-lg">
    <h1 className="text-2xl font-bold mb-4">Checkout</h1>
    <PaymentForm amount={total} />
  </div></ProtectedRoute>);
}