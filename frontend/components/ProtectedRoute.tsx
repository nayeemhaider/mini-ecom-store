import { ReactNode, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../contexts/AuthContext';
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => { if (!user) router.replace('/login'); }, [user]);
  if (!user) return <p>Redirecting...</p>;
  return <>{children}</>;
}