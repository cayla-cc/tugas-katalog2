import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ produk, onTambah }) => {
  return (
    <div className="product-grid">
      {produk.map((item) => (
        <ProductCard
          key={item.id}
          nama={item.nama}
          harga={item.harga}
          stok={item.stok}
          onTambah={() => onTambah(item)}
        />
      ))}
    </div>
  );
};

export default ProductList;