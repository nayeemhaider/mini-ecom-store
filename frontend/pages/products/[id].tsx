import { useRouter } from 'next/router';
import { useEffect,useState } from 'react';
import api from '../../utils/api';
import { useCart } from '../../contexts/CartContext';

interface Product { id:number; name:string; description:string; price:number; images:string[]; stock:number; }
export default function ProductDetailPage() {
  const { query } = useRouter();
  const { addItem } = useCart();
  const [product,setProduct]=useState<Product|null>(null);
  useEffect(()=>{ if(query.id)api.get(`/products/${query.id}`).then(res=>setProduct(res.data)); },[query.id]);
  if(!product) return <p>Loading...</p>;
  return (<div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
    <img src={product.images[0]} alt={product.name} className="h-64 w-full object-cover mb-4" />
    <p className="mb-2">{product.description}</p>
    <p className="font-semibold mb-4">${product.price.toFixed(2)}</p>
    <button onClick={()=>addItem(String(product.id),product.price)} className="bg-blue-600 text-white px-4 py-2 rounded">Add to Cart</button>
  </div>);
}