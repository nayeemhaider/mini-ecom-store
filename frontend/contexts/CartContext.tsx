import { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem { productId:string; quantity:number; unitPrice:number; }
interface CartContextType { items:CartItem[]; addItem(id:string,price:number):void; updateItem(id:string,qty:number):void; removeItem(id:string):void; clearCart():void; }
const CartContext = createContext<CartContextType>({} as any);
export function CartProvider({ children }: { children: ReactNode }) {
  const [items,setItems] = useState<CartItem[]>([]);
  const addItem = (productId:string,unitPrice:number) => setItems(old => [...old,{ productId, quantity:1, unitPrice }]);
  const updateItem = (productId:string,quantity:number) => setItems(old => old.map(i=>i.productId===productId?{...i,quantity}:i));
  const removeItem = (productId:string) => setItems(old => old.filter(i=>i.productId!==productId));
  const clearCart = () => setItems([]);
  return <CartContext.Provider value={{ items,addItem,updateItem,removeItem,clearCart }}>{children}</CartContext.Provider>;
}
export const useCart = () => useContext(CartContext);