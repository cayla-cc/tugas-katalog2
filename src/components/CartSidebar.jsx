import React from 'react';

const formatRupiah = (angka) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(angka);
};

const CartSidebar = ({ keranjang, onHapus }) => {
  const total = keranjang.reduce((jumlah, item) => jumlah + (item.harga * item.jumlah), 0);

  return (
    <div className="keranjang">
      <div className="judul-keranjang">
        <span>Keranjang ({keranjang.length} item)</span>
        <span>Total: {formatRupiah(total)}</span>
      </div>

      {keranjang.length === 0 ? (
        <p className="teks-kosong">Belum ada produk yang ditambahkan</p>
      ) : (
        <ul className="daftar-item">
          {keranjang.map(item => (
            <li key={item.id} className="item-keranjang">
              <span>{item.nama} × {item.jumlah}</span>
              <span>{formatRupiah(item.harga * item.jumlah)}</span>
              <button 
                onClick={() => onHapus(item.id)}
                className="tombol-hapus"
              >
                [hapus]
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartSidebar;