import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import ProductDetail from './components/ProductDetail';

const CheckoutFormBayangan = () => (
  <div style={{ border: '1px solid #edf2f7', padding: '20px', borderRadius: '16px', backgroundColor: '#fff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
    <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', textAlign: 'center' }}>Form Checkout</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <label style={{ fontSize: '14px', color: '#4a5568' }}>Nama</label>
      <input type="text" placeholder="Masukkan nama" style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
    </div>
  </div>
);

export default function App() {
  const [products, setProducts] = useState([]);
  const [kategoriTerpilih, setKategoriTerpilih] = useState('Semua');
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [searchInput, setSearchInput] = useState('');          
  const [debouncedSearch, setDebouncedSearch] = useState('');  

  // --- REVISI STEP 6: State untuk menyimpan pilihan urutan ---
  const [sortBy, setSortBy] = useState('default'); 

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Gagal ambil data:", err));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const tambahKeKeranjang = (produk) => {
    const itemAda = cart.find((item) => item.id === produk.id);
    if (itemAda) {
      setCart(cart.map((item) => 
        item.id === produk.id ? { ...item, qty: item.qty + 1 } : item
      ));
    } else {
      setCart([...cart, { ...produk, qty: 1 }]);
    }
  };

  const produkDifilter = products.filter((product) => {
    const cocokKata = product.title.toLowerCase().includes(debouncedSearch.toLowerCase());
    let cocokKategori = true;
    if (kategoriTerpilih === 'Elektronik') cocokKategori = product.category === 'electronics';
    else if (kategoriTerpilih === 'Perhiasan') cocokKategori = product.category === 'jewelery';
    else if (kategoriTerpilih === 'Pria') cocokKategori = product.category === "men's clothing";
    return cocokKata && cocokKategori;
  });

  // --- REVISI STEP 6: Mengurutkan produk tanpa merusak array asli (menggunakan [...array]) ---
  const produkDiUrutkan = [...produkDifilter].sort((a, b) => {
    if (sortBy === 'termurah') return a.price - b.price;
    if (sortBy === 'termahal') return b.price - a.price;
    if (sortBy === 'nama') return a.title.localeCompare(b.title);
    return 0; // default (tidak diurutkan)
  });

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <h1 style={{ fontSize: '36px', color: '#1e293b', fontWeight: 'bold' }}>🛒 Mini Product Catalog</h1>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Cari produk (Debounced)..." 
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{ width: '100%', maxWidth: '1200px', padding: '15px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '16px' }}
        />
      </div>

      {/* REVISI STEP 6: Menyelaraskan Tombol Kategori & Dropdown Sorting */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto 25px auto' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['Semua', 'Elektronik', 'Perhiasan', 'Pria'].map((kat) => (
            <button
              key={kat} 
              onClick={() => setKategoriTerpilih(kat)}
              style={{ backgroundColor: kategoriTerpilih === kat ? '#1d4ed8' : '#2563eb', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}
            >
              {kat}
            </button>
          ))}
        </div>

        {/* Elemen Dropdown Pilihan Sorting */}
        <div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#fff', fontSize: '14px', cursor: 'pointer', color: '#334155', fontWeight: '500' }}
          >
            <option value="default">Urutkan: Default</option>
            <option value="termurah">Harga: Termurah</option>
            <option value="termahal">Harga: Termahal</option>
            <option value="nama">Nama: A-Z</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '30px', maxWidth: '1200px', margin: '0 auto', alignItems: 'flex-start' }}>
        <div style={{ flex: 3 }}>
          {products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px' }}>Loading data...</div>
          ) : (
            /* Diubah untuk merender produk yang sudah melewati proses pengurutan */
            <ProductList produk={produkDiUrutkan} onTambah={tambahKeKeranjang} onSelect={setSelectedProduct} />
          )}
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', minWidth: '320px' }}>
          <CartSidebar cart={cart} setCart={setCart} />
          <CheckoutFormBayangan />
        </div>
      </div>

      <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />

    </div>
  );
}