import { useEffect,useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import api from '../utils/api';

interface Order { id:string; status:string; total:number; createdAt:string; }
export default function OrdersPage() {
  const [orders,setOrders]=useState<Order[]>([]);
  useEffect(()=>{ api.get('/orders').then(res=>setOrders(res.data.orders)); },[]);
  return (<ProtectedRoute><div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
    {orders.length===0 ? <p>No orders found.</p> : (<ul className="space-y-4">
      {orders.map(o=>(<li key={o.id} className="border p-4">
        <p>Order: {o.id}</p><p>Status: {o.status}</p><p>Total: €{o.total.toFixed(2)}</p>
        <p>Date: {new Date(o.createdAt).toLocaleString()}</p>
      </li>))}
    </ul>)}
  </div></ProtectedRoute>);
}