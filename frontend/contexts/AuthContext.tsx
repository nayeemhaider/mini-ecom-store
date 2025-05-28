import { createContext, useState, ReactNode, useEffect } from 'react';
import api from '../utils/api';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

interface User { id: number; email: string; name: string; }
interface AuthContextType { user: User | null; login(email: string,password: string): Promise<void>; register(data: { email:string;password:string;name:string }):Promise<void>; logout():void; }
export const AuthContext = createContext<AuthContextType>({} as any);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User|null>(null);
  useEffect(() => { const token = Cookies.get('token'); if (token) { const decoded:any = jwtDecode(token); setUser({ id:decoded.id,email:decoded.email,name:decoded.name }); }} , []);
  const login = async (email:string,password:string) => {
    const res = await api.post('/auth/login',{ email,password });
    Cookies.set('token',res.data.token);
    const decoded:any = jwtDecode(res.data.token);
    setUser({ id:decoded.id,email:decoded.email,name:decoded.name });
  };
  const register = async (data:{email:string;password:string;name:string}) => {
    const res = await api.post('/auth/register',data);
    Cookies.set('token',res.data.token);
    const decoded:any = jwtDecode(res.data.token);
    setUser({ id:decoded.id,email:decoded.email,name:decoded.name });
  };
  const logout = () => { Cookies.remove('token'); setUser(null); };
  return <AuthContext.Provider value={{ user,login,register,logout }}>{children}</AuthContext.Provider>;
}