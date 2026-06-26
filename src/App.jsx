import { useState } from 'react';

// 📦 DATA 50 PRODUK DENGAN STOK BERBEDA (TIDAK SEMUA TERSEDIA)
const products = [
  // 📝 KATEGORI PULPEN & ALAT TULIS TINTA
  { id: 1, name: 'Pulpen Hitam Standar', price: 3500, stock: 15, kategori: 'Pulpen' },
  { id: 2, name: 'Pulpen Biru Standar', price: 3500, stock: 0, kategori: 'Pulpen' }, // Stok Habis
  { id: 3, name: 'Pulpen Merah Standar', price: 3500, stock: 10, kategori: 'Pulpen' },
  { id: 4, name: 'Pulpen Gel Hitam', price: 5000, stock: 8, kategori: 'Pulpen' },
  { id: 5, name: 'Pulpen Gel Biru', price: 5000, stock: 0, kategori: 'Pulpen' }, // Stok Habis
  { id: 6, name: 'Pulpen 4 Warna', price: 8500, stock: 3, kategori: 'Pulpen' },
  { id: 7, name: 'Spidol Besar Hitam', price: 6000, stock: 9, kategori: 'Pulpen' },
  { id: 8, name: 'Spidol Besar Biru', price: 6000, stock: 0, kategori: 'Pulpen' }, // Stok Habis
  { id: 9, name: 'Spidol Kecil Warna', price: 4500, stock: 20, kategori: 'Pulpen' },
  { id: 10, name: 'Stabilo Warna Kuning', price: 7000, stock: 0, kategori: 'Pulpen' }, // Stok Habis

  // 📓 KATEGORI BUKU & KERTAS
  { id: 11, name: 'Buku Tulis Bergaris', price: 5000, stock: 25, kategori: 'Buku & Kertas' },
  { id: 12, name: 'Buku Tulis Kotak', price: 5000, stock: 0, kategori: 'Buku & Kertas' }, // Stok Habis
  { id: 13, name: 'Buku Gambar Besar', price: 7500, stock: 4, kategori: 'Buku & Kertas' },
  { id: 14, name: 'Buku Gambar Kecil', price: 4500, stock: 18, kategori: 'Buku & Kertas' },
  { id: 15, name: 'Buku Agenda Kecil', price: 12000, stock: 0, kategori: 'Buku & Kertas' }, // Stok Habis
  { id: 16, name: 'Kertas HVS A4 70gr', price: 45000, stock: 8, kategori: 'Buku & Kertas' },
  { id: 17, name: 'Kertas HVS F4 70gr', price: 48000, stock: 2, kategori: 'Buku & Kertas' },
  { id: 18, name: 'Kertas Warna A4', price: 15000, stock: 0, kategori: 'Buku & Kertas' }, // Stok Habis
  { id: 19, name: 'Kertas Manila', price: 2000, stock: 30, kategori: 'Buku & Kertas' },
  { id: 20, name: 'Kertas Karton', price: 3000, stock: 0, kategori: 'Buku & Kertas' }, // Stok Habis

  // ✏️ KATEGORI PENSIL & PENGHAPUS
  { id: 21, name: 'Pensil 2B', price: 3000, stock: 40, kategori: 'Pensil & Penghapus' },
  { id: 22, name: 'Pensil HB', price: 3000, stock: 0, kategori: 'Pensil & Penghapus' }, // Stok Habis
  { id: 23, name: 'Pensil Warna 12 pcs', price: 18000, stock: 15, kategori: 'Pensil & Penghapus' },
  { id: 24, name: 'Pensil Warna 24 pcs', price: 32000, stock: 0, kategori: 'Pensil & Penghapus' }, // Stok Habis
  { id: 25, name: 'Penghapus Karet Kecil', price: 2000, stock: 50, kategori: 'Pensil & Penghapus' },
  { id: 26, name: 'Penghapus Karet Besar', price: 4000, stock: 0, kategori: 'Pensil & Penghapus' }, // Stok Habis
  { id: 27, name: 'Rautan Pensil Kecil', price: 2500, stock: 30, kategori: 'Pensil & Penghapus' },
  { id: 28, name: 'Rautan Pensil Putar', price: 12000, stock: 2, kategori: 'Pensil & Penghapus' },
  { id: 29, name: 'Papan Tulis Pensil', price: 25000, stock: 0, kategori: 'Pensil & Penghapus' }, // Stok Habis
  { id: 30, name: 'Cairan Koreksi', price: 6000, stock: 18, kategori: 'Pensil & Penghapus' },

  // 📐 KATEGORI PENGGARIS & ALAT BANTU
  { id: 31, name: 'Penggaris Plastik 15 cm', price: 2500, stock: 35, kategori: 'Penggaris & Alat Bantu' },
  { id: 32, name: 'Penggaris Plastik 30 cm', price: 4000, stock: 0, kategori: 'Penggaris & Alat Bantu' }, // Stok Habis
  { id: 33, name: 'Penggaris Besi 30 cm', price: 8000, stock: 12, kategori: 'Penggaris & Alat Bantu' },
  { id: 34, name: 'Busur Derajat', price: 5000, stock: 0, kategori: 'Penggaris & Alat Bantu' }, // Stok Habis
  { id: 35, name: 'Jangka Ukur', price: 10000, stock: 5, kategori: 'Penggaris & Alat Bantu' },
  { id: 36, name: 'Set Segitiga', price: 9000, stock: 18, kategori: 'Penggaris & Alat Bantu' },
  { id: 37, name: 'Kapur Tulis Putih', price: 1500, stock: 0, kategori: 'Penggaris & Alat Bantu' }, // Stok Habis
  { id: 38, name: 'Kapur Tulis Warna', price: 3000, stock: 30, kategori: 'Penggaris & Alat Bantu' },
  { id: 39, name: 'Penghapus Papan Tulis', price: 7000, stock: 0, kategori: 'Penggaris & Alat Bantu' }, // Stok Habis
  { id: 40, name: 'Perekat Cair Kecil', price: 5000, stock: 25, kategori: 'Penggaris & Alat Bantu' },

  // 📎 KATEGORI ALAT IKAT & JILID
  { id: 41, name: 'Staples Kecil', price: 8000, stock: 20, kategori: 'Alat Ikat & Jilid' },
  { id: 42, name: 'Isi Staples Kecil', price: 3000, stock: 0, kategori: 'Alat Ikat & Jilid' }, // Stok Habis
  { id: 43, name: 'Staples Besar', price: 15000, stock: 12, kategori: 'Alat Ikat & Jilid' },
  { id: 44, name: 'Isi Staples Besar', price: 5000, stock: 0, kategori: 'Alat Ikat & Jilid' }, // Stok Habis
  { id: 45, name: 'Penjepit Kertas Kecil', price: 2500, stock: 60, kategori: 'Alat Ikat & Jilid' },
  { id: 46, name: 'Penjepit Kertas Besar', price: 4000, stock: 5, kategori: 'Alat Ikat & Jilid' },
  { id: 47, name: 'Lem Kertas Stik', price: 4500, stock: 0, kategori: 'Alat Ikat & Jilid' }, // Stok Habis
  { id: 48, name: 'Tali Pengikat Kertas', price: 3000, stock: 35, kategori: 'Alat Ikat & Jilid' },
  { id: 49, name: 'Bolpoin Jilid', price: 6000, stock: 0, kategori: 'Alat Ikat & Jilid' }, // Stok Habis
  { id: 50, name: 'Map Plastik', price: 7500, stock: 18, kategori: 'Alat Ikat & Jilid' }
];

function App() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [kategoriTerpilih, setKategoriTerpilih] = useState('Semua');
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');

  const daftarKategori = ['Semua', ...new Set(products.map(p => p.kategori))];

  const filteredProducts = products.filter(product => {
    const cocokNama = product.name.toLowerCase().includes(searchKeyword.toLowerCase());
    const cocokKategori = kategoriTerpilih === 'Semua' || product.kategori === kategoriTerpilih;
    return cocokNama && cocokKategori;
  });

  const addToCart = (product) => {
    if (product.stock <= 0) {
      setMessage('❌ Barang ini sudah habis stoknya!');
      setTimeout(() => setMessage(''), 2000);
      return;
    }
    const ada = cart.find(item => item.id === product.id);
    if (ada) {
      if (ada.qty >= product.stock) {
        setMessage('⚠️ Jumlah pesanan melebihi stok yang tersedia!');
        setTimeout(() => setMessage(''), 2000);
        return;
      }
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    setMessage('✅ Barang ditambahkan ke keranjang!');
    setTimeout(() => setMessage(''), 2000);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    setMessage('🗑️ Barang dihapus dari keranjang!');
    setTimeout(() => setMessage(''), 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setMessage('⚠️ Harap isi Nama dan Email terlebih dahulu!');
      return;
    }
    if (cart.length === 0) {
      setMessage('⚠️ Keranjang belanja masih kosong!');
      return;
    }
    setMessage('✅ Pesanan berhasil dikirim! Terima kasih telah berbelanja.');
    setCart([]);
    setFormData({ name: '', email: '' });
    setTimeout(() => setMessage(''), 3000);
  };

  const totalHarga = cart.reduce((total, item) => total + (item.price * item.qty), 0);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.judul}>Mini Product Catalog</h1>
        <div style={styles.garisPemisah}></div>

        <div style={styles.barisFilter}>
          <label style={styles.labelFilter}>Pilih Kategori:</label>
          <select
            value={kategoriTerpilih}
            onChange={(e) => setKategoriTerpilih(e.target.value)}
            style={styles.selectKategori}
          >
            {daftarKategori.map((kategori, index) => (
              <option key={index} value={kategori}>{kategori}</option>
            ))}
          </select>

          <label style={styles.labelCari}>Cari Produk:</label>
          <input
            type="text"
            placeholder="Ketik nama produk..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            style={styles.inputCari}
          />
        </div>
      </header>

      {message && <div style={styles.notif}>{message}</div>}

      <div style={styles.gridProduk}>
        {filteredProducts.length === 0 ? (
          <p style={styles.teksKosong}>Produk tidak ditemukan</p>
        ) : (
          filteredProducts.map(product => (
            <div key={product.id} style={styles.kartuProduk}>
              <h3 style={styles.namaProduk}>{product.name}</h3>
              <p style={styles.harga}>Rp {product.price.toLocaleString('id-ID')}</p>
              <p style={styles.kategoriTeks}>{product.kategori}</p>
              <p style={product.stock > 0 ? styles.stokAda : styles.stokHabis}>
                {product.stock > 0 ? `[Tersedia: ${product.stock} buah]` : '[Stok Habis]'}
              </p>
              <button
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
                style={product.stock > 0 ? styles.tombolTambah : styles.tombolMati}
              >
                {product.stock > 0 ? '[+ Tambah]' : '❌ Tidak Tersedia'}
              </button>
            </div>
          ))
        )}
      </div>

      <section style={styles.bagianBawah}>
        <h2 style={styles.judulBagian}>Keranjang Belanja</h2>
        {cart.length === 0 ? (
          <p style={styles.teksKosong}>Keranjang masih kosong</p>
        ) : (
          <div>
            {cart.map(item => (
              <div key={item.id} style={styles.barangKeranjang}>
                <span>{item.name} × {item.qty}</span>
                <span>Rp {(item.price * item.qty).toLocaleString('id-ID')}</span>
                <button onClick={() => removeFromCart(item.id)} style={styles.tombolHapus}>Hapus</button>
              </div>
            ))}
            <h3 style={styles.totalHarga}>Total: Rp {totalHarga.toLocaleString('id-ID')}</h3>
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.formPesan}>
          <h3 style={styles.judulForm}>Formulir Pemesanan</h3>
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={styles.inputForm}
            required
          />
          <input
            type="email"
            placeholder="Email Aktif"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={styles.inputForm}
            required
          />
          <button type="submit" style={styles.tombolKirim}>Kirim Pesanan</button>
        </form>
      </section>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '30px 20px',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#ffffff'
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  judul: {
    fontSize: '32px',
    color: '#2d3748',
    margin: '0 0 12px'
  },
  garisPemisah: {
    height: '2px',
    background: 'linear-gradient(90deg, #3182ce, #38b2ac)',
    margin: '0 auto 25px',
    width: '80%'
  },
  barisFilter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    flexWrap: 'wrap'
  },
  labelFilter: {
    fontSize: '17px',
    fontWeight: '500',
    color: '#2d3748'
  },
  selectKategori: {
    padding: '10px 14px',
    fontSize: '16px',
    border: '2px solid #cbd5e0',
    borderRadius: '8px',
    backgroundColor: 'white'
  },
  labelCari: {
    fontSize: '17px',
    fontWeight: '500',
    color: '#2d3748',
    marginLeft: '10px'
  },
  inputCari: {
    width: '100%',
    maxWidth: '500px',
    padding: '10px 14px',
    fontSize: '16px',
    border: '2px solid #cbd5e0',
    borderRadius: '8px',
    outline: 'none'
  },
  notif: {
    padding: '12px',
    marginBottom: '20px',
    borderRadius: '6px',
    backgroundColor: '#ebf8ff',
    color: '#2c5282',
    textAlign: 'center',
    fontWeight: '500'
  },
  gridProduk: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  },
  kartuProduk: {
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    padding: '25px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  },
  namaProduk: {
    fontSize: '18px',
    marginBottom: '10px',
    color: '#2d3748'
  },
  harga: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#3182ce',
    marginBottom: '8px'
  },
  kategoriTeks: {
    fontSize: '14px',
    color: '#718096',
    fontStyle: 'italic',
    marginBottom: '12px'
  },
  stokAda: {
    fontSize: '15px',
    fontWeight: '500',
    padding: '4px 12px',
    borderRadius: '20px',
    display: 'inline-block',
    marginBottom: '18px',
    backgroundColor: '#f0fff4',
    color: '#22543d'
  },
  stokHabis: {
    fontSize: '15px',
    fontWeight: '500',
    padding: '4px 12px',
    borderRadius: '20px',
    display: 'inline-block',
    marginBottom: '18px',
    backgroundColor: '#fed7d7',
    color: '#742a2a'
  },
  tombolTambah: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    fontWeight: '500',
    backgroundColor: '#3182ce',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  tombolMati: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    fontWeight: '500',
    backgroundColor: '#a0aec0',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'not-allowed'
  },
  bagianBawah: {
    backgroundColor: '#f7fafc',
    padding: '25px',
    borderRadius: '10px'
  },
  judulBagian: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#2d3748'
  },
  teksKosong: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: '40px',
    color: '#718096',
    fontSize: '18px'
  },
  barangKeranjang: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    backgroundColor: 'white',
    borderRadius: '6px',
    marginBottom: '10px'
  },
  tombolHapus: {
    padding: '5px 10px',
    backgroundColor: '#e53e3e',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  totalHarga: {
    textAlign: 'right',
    marginTop: '15px',
    fontSize: '20px',
    color: '#2d3748',
    fontWeight: 'bold'
  },
  formPesan: {
    marginTop: '30px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  judulForm: {
    fontSize: '18px',
    marginBottom: '8px'
  },
  inputForm: {
    padding: '10px',
    border: '1px solid #cbd5e0',
    borderRadius: '6px',
    fontSize: '15px'
  },
  tombolKirim: {
    padding: '12px',
    backgroundColor: '#38a169',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer'
  }
};

export default App;