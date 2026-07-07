import React from 'react';

export default function ProductDetail({ product, onClose }) {
  if (!product) return null;

  // Format harga ke Rupiah
  const hargaRupiah = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(product.price * 15000);

  return (
    <div 
      onClick={onClose} // Klik di luar box putih untuk menutup modal
      style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
        justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px'
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()} // Supaya kalau klik isi modal, tidak ikut tertutup
        style={{
          backgroundColor: '#fff', padding: '30px', borderRadius: '16px',
          maxWidth: '500px', width: '100%', boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          position: 'relative', textAlign: 'center'
        }}
      >
        <img src={product.image} alt={product.title} style={{ height: '200px', objectFit: 'contain', marginBottom: '20px' }} />
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b', marginBottom: '10px' }}>{product.title}</h2>
        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '15px', textAlign: 'justify', lineHeight: '1.5' }}>{product.description}</p>
        <p style={{ display: 'inline-block', backgroundColor: '#f1f5f9', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', color: '#475569', fontWeight: '600', marginBottom: '15px' }}>
          Kategori: {product.category}
        </p>
        <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px' }}>{hargaRupiah}</p>
        <button 
          onClick={onClose}
          style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
        >
          Tutup
        </button>
      </div>
    </div>
  );
}