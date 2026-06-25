import React, { useState } from 'react';
import { products } from './data/products';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import CheckoutForm from './components/CheckoutForm';

function App() {
  const [cari, setCari] = useState('');
  const [keranjang, setKeranjang] = useState([]);

  const tambahKeKeranjang = (produk) => {
    setKeranjang(prev => {
      const sudahAda = prev.find(item => item.id === produk.id);
      if (sudahAda) {
        return prev.map(item =>
          item.id === produk.id ? { ...item, jumlah: item.jumlah + 1 } : item
        );
      } else {
        return [...prev, { ...produk, jumlah: 1 }];
      }
    });
  };

  const hapusDariKeranjang = (idProduk) => {
    setKeranjang(prev => prev.filter(item => item.id !== idProduk));
  };

  const produkTersaring = products.filter(item =>
    item.nama.toLowerCase().includes(cari.toLowerCase().trim())
  );

  return (
    <div className="container">
      <h1>Mini Product Catalog</h1>

      <div className="baris-cari">
        <label>Cari produk :</label>
        <input
          type="text"
          placeholder="Ketik nama produk..."
          value={cari}
          onChange={(e) => setCari(e.target.value)}
        />
      </div>

      <div className="daftar-produk">
        {produkTersaring.map(produk => (
          <ProductCard
            key={produk.id}
            produk={produk}
            onTambah={tambahKeKeranjang}
          />
        ))}
      </div>

      <CartSidebar
        keranjang={keranjang}
        onHapus={hapusDariKeranjang}
      />

      <CheckoutForm
        keranjang={keranjang}
        onReset={() => setKeranjang([])}
      />
    </div>
  );
}

export default App;