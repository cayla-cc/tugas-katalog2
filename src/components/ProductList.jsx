import React from 'react';
import ProductCard from './ProductCard';

// Pastikan parameter pertamanya adalah 'produk' (menggunakan huruf kecil sesuai App.jsx)
const ProductList = ({ produk = [], onTambah, onSelect }) => {
  return (
    <div className="product-grid" style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
      gap: '25px' 
    }}>
      {produk.map((item) => (
        <ProductCard
          key={item.id}
          product={item}
          onTambah={() => onTambah(item)}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default ProductList;