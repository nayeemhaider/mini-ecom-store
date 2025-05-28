import { useState,useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../contexts/AuthContext';

export default function RegisterPage() {
  const { register } = useContext(AuthContext);
  const [name,setName]=useState(''),[email,setEmail]=useState(''),[password,setPassword]=useState('');
  const router=useRouter();
  const handleSubmit=async(e:any)=>{ e.preventDefault(); await register({ name,email,password }); router.push('/'); };
  return (<div className="container mx-auto p-4 max-w-md">
    <h1 className="text-2xl font-bold mb-4">Register</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} className="w-full p-2 border" />
      <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 border" />
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-2 border" />
      <button type="submit" className="w-full bg-green-600 text-white p-2">Register</button>
    </form>
  </div>);
}