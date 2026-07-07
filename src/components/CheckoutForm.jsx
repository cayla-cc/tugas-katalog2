import React from 'react';

// Pastikan kita menangkap properti 'onTambah' di sini
export default function ProductCard({ product, onTambah }) {
  // Format harga ke Rupiah
  const hargaRupiah = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(product.price * 15000); 

  return (
    <div style={{ 
      border: '1px solid #edf2f7', 
      padding: '20px', 
      borderRadius: '16px', 
      textAlign: 'center', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
      height: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img 
          src={product.image} 
          alt={product.title} 
          style={{ height: '160px', objectFit: 'contain', marginBottom: '15px', maxWidth: '100%' }} 
        />
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#4a5568', height: '65px', overflow: 'hidden', margin: '10px 0', lineHeight: '1.4' }}>
          {product.title}
        </h3>
      </div>
      
      <div>
        <p style={{ color: '#1e293b', fontWeight: 'bold', fontSize: '16px', marginBottom: '15px' }}>
          {hargaRupiah}
        </p>
        
        {/* Tombol Biru pembawa fungsi tambah keranjang */}
        <button 
          onClick={onTambah} 
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            width: '100%',
            padding: '12px 0',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px'
          }}
        >
          + Tambah
        </button>
      </div>
    </div>
  );
}