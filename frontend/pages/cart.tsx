import ProtectedRoute from '../components/ProtectedRoute';
import { useCart } from '../contexts/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { items, updateItem, removeItem } = useCart();
  return (<ProtectedRoute><div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
    {items.length===0? <p>Cart is empty.</p> : (<div className="space-y-4">
      {items.map(item=>(<div key={item.productId} className="flex justify-between items-center">
        <Link href={`/products/${item.productId}`}>Product {item.productId}</Link>
        <input type="number" value={item.quantity} min={1} onChange={e=>updateItem(item.productId,Number(e.target.value))} className="w-16 border p-1" />
        <button onClick={()=>removeItem(item.productId)} className="text-red-600">Remove</button>
      </div>))}
      <Link href="/checkout"><button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">Proceed to Checkout</button></Link>
    </div>)}</div></ProtectedRoute>);
}