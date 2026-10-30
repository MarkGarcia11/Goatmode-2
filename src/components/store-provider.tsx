"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Product } from "@/lib/catalog";

export type CartItem = {
  lineId: string;
  productSlug: string;
  size: string;
  color: string;
  quantity: number;
};

type StoreContextValue = {
  items: CartItem[];
  itemCount: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeItem: (lineId: string) => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);
const CART_KEY = "goat-mode-cart-v1";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CART_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed)) setItems(parsed as CartItem[]);
      }
    } catch {
      window.localStorage.removeItem(CART_KEY);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items, ready]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const addToCart = useCallback((product: Product, size: string, color: string, quantity = 1) => {
    const lineId = `${product.id}-${size}-${color}`;
    setItems((current) => {
      const existing = current.find((item) => item.lineId === lineId);
      if (existing) {
        return current.map((item) => item.lineId === lineId ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...current, { lineId, productSlug: product.slug, size, color, quantity }];
    });
    setIsCartOpen(true);
  }, []);

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    if (quantity < 1) {
      setItems((current) => current.filter((item) => item.lineId !== lineId));
      return;
    }
    setItems((current) => current.map((item) => item.lineId === lineId ? { ...item, quantity } : item));
  }, []);

  const removeItem = useCallback((lineId: string) => {
    setItems((current) => current.filter((item) => item.lineId !== lineId));
  }, []);

  const value = useMemo(() => ({
    items,
    itemCount: items.reduce((count, item) => count + item.quantity, 0),
    isCartOpen,
    openCart,
    closeCart,
    addToCart,
    updateQuantity,
    removeItem,
  }), [items, isCartOpen, openCart, closeCart, addToCart, updateQuantity, removeItem]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
}
