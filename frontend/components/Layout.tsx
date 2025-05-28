import { ReactNode } from 'react';
import Link from 'next/link';
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <nav className="bg-gray-800 p-4 text-white">
        <Link href="/">Home</Link>
        <Link href="/cart" className="ml-4">Cart</Link>
        <Link href="/orders" className="ml-4">Orders</Link>
      </nav>
      <main className="mt-6">{children}</main>
    </div>
  );
}