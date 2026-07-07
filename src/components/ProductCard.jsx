import React from 'react';

export default function ProductCard({ product, onTambah, onSelect }) {
  const hargaRupiah = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(product.price * 15000); 

  return (
    <div 
      onClick={() => onSelect(product)} // PENTING: Klik seluruh kartu akan membuka detail
      style={{ 
        border: '1px solid #edf2f7', padding: '20px', borderRadius: '16px', 
        textAlign: 'center', display: 'flex', flexDirection: 'column', 
        justifyContent: 'space-between', backgroundColor: '#fff',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', height: '100%',
        boxSizing: 'border-box', cursor: 'pointer'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={product.image} alt={product.title} style={{ height: '160px', objectFit: 'contain', marginBottom: '15px', maxWidth: '100%' }} />
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#4a5568', height: '65px', overflow: 'hidden', margin: '10px 0', lineHeight: '1.4' }}>
          {product.title}
        </h3>
      </div>
      
      <div>
        <p style={{ color: '#1e293b', fontWeight: 'bold', fontSize: '16px', marginBottom: '15px' }}>{hargaRupiah}</p>
        <button 
          onClick={(e) => {
            e.stopPropagation(); // PENTING: Mencegah modal ikut terbuka saat pencet tombol tambah
            onTambah();
          }} 
          style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', width: '100%', padding: '12px 0', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}
        >
          + Tambah
        </button>
      </div>
    </div>
  );
}