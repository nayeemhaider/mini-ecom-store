import { useEffect,useState } from 'react';
import Link from 'next/link';
import ProtectedRoute from '../components/ProtectedRoute';
import api from '../utils/api';

interface Product { id:number; name:string; price:number; thumbnailUrl:string; }
export default function HomePage() {
  const [products,setProducts]=useState<Product[]>([]);
  useEffect(()=>{ api.get('/products').then(res=>setProducts(res.data.data)); },[]);
  return (<ProtectedRoute><div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Products</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map(p=>(<Link key={p.id} href={`/products/${p.id}`}><div className="border p-4 hover:shadow-lg cursor-pointer">
        <img src={p.thumbnailUrl} alt={p.name} className="h-48 w-full object-cover mb-2" />
        <h2 className="font-semibold">{p.name}</h2>
        <p>${p.price.toFixed(2)}</p>
      </div></Link>))}
    </div></div></ProtectedRoute>);
}