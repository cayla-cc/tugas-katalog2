import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Membuat Context untuk Keranjang
const CartContext = createContext();

// 2. Membuat Komponen Provider
export function CartProvider({ children }) {
  // Mengambil data awal keranjang dari LocalStorage jika ada
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Menyimpan data keranjang ke LocalStorage otomatis setiap kali ada perubahan
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Fungsi untuk menambah produk ke keranjang
  const tambahKeKeranjang = (produk) => {
    const itemAda = cart.find((item) => item.id === produk.id);
    if (itemAda) {
      // Jika produk sudah ada, tambahkan quantity (qty) nya
      setCart(cart.map((item) => 
        item.id === produk.id ? { ...item, qty: item.qty + 1 } : item
      ));
    } else {
      // Jika produk belum ada, masukkan sebagai item baru dengan qty = 1
      setCart([...cart, { ...produk, qty: 1 }]);
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, tambahKeKeranjang }}>
      {children}
    </CartContext.Provider>
  );
}

// 3. Custom Hook agar komponen lain tinggal panggil useCart() saja
export function useCart() {
  return useContext(CartContext);
}