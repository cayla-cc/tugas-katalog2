import React from 'react';

const formatRupiah = (angka) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(angka);
};

const ProductCard = ({ produk, onTambah }) => {
  return (
    <div className="kartu-produk">
      <h3>{produk.nama}</h3>
      <p className="harga">{formatRupiah(produk.harga)}</p>
      <p className={`status ${produk.stok ? 'tersedia' : 'habis'}`}>
        [{produk.stok ? 'Tersedia' : 'Habis'}]
      </p>
      <button
        onClick={() => onTambah(produk)}
        disabled={!produk.stok}
        className="tombol-tambah"
      >
        [+ Tambah]
      </button>
    </div>
  );
};

export default ProductCard;