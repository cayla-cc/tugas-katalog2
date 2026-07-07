import React from 'react';

export default function CartSidebar({ cart = [], setCart }) {
  
  // Menghitung total harga belanjaan (dikali 15000 agar sinkron dengan ProductCard)
  const totalHarga = cart.reduce((total, item) => {
    return total + (item.price * 15000 * item.qty);
  }, 0);

  // Helper format mata uang Rupiah
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(angka);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', backgroundColor: '#f9f9f9', position: 'sticky', top: '20px' }}>
      <h2 style={{ fontSize: '18px', marginBottom: '15px', borderBottom: '2px solid #007bff', paddingBottom: '5px' }}>
        Keranjang Belanja
      </h2>
      
      {cart.length === 0 ? (
        <p style={{ color: '#777', fontSize: '14px', textAlign: 'center', padding: '20px 0' }}>
          Keranjang masih kosong.
        </p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px', borderBottom: '1px dashed #eee', paddingBottom: '8px' }}>
              <div style={{ maxWidth: '60%' }}>
                <span style={{ fontWeight: 'bold', color: '#007bff' }}>{item.qty}x</span> {item.title.substring(0, 18)}...
              </div>
              <div style={{ fontWeight: '500' }}>
                {formatRupiah(item.price * 15000 * item.qty)}
              </div>
            </div>
          ))}
          
          <hr style={{ border: '0', borderTop: '1px solid #ccc', margin: '15px 0' }} />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '16px' }}>
            <span>Total:</span>
            <span style={{ color: '#e53935' }}>{formatRupiah(totalHarga)}</span>
          </div>
        </div>
      )}
    </div>
  );
}