import React, { useState } from 'react';

const CheckoutForm = ({ keranjang, onReset }) => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [pesan, setPesan] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nama.trim() || !email.trim()) {
      setPesan('⚠️ Silakan isi nama dan email terlebih dahulu');
      return;
    }
    setPesan('✅ Pesanan berhasil diproses! Terima kasih atas pembeliannya');
    setTimeout(() => {
      setNama('');
      setEmail('');
      setPesan('');
      onReset();
    }, 2500);
  };

  return (
    <form onSubmit={handleSubmit} className="form-checkout">
      <div className="baris-input">
        <label>Nama :</label>
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Masukkan nama lengkap"
        />
      </div>
      <div className="baris-input">
        <label>Email :</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="contoh@email.com"
        />
      </div>
      <button
        type="submit"
        disabled={keranjang.length === 0}
        className="tombol-checkout"
      >
        [Checkout]
      </button>
      {pesan && <p className="pesan">{pesan}</p>}
    </form>
  );
};

export default CheckoutForm;