import { useState,useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../contexts/AuthContext';

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [email,setEmail]=useState(''),[password,setPassword]=useState('');
  const router=useRouter();
  const handleSubmit=async(e:any)=>{ e.preventDefault(); await login(email,password); router.push('/'); };
  return (<div className="container mx-auto p-4 max-w-md">
    <h1 className="text-2xl font-bold mb-4">Login</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 border" />
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-2 border" />
      <button type="submit" className="w-full bg-blue-600 text-white p-2">Login</button>
    </form>
  </div>);
}