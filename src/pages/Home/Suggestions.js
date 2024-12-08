import React from 'react';
import './Suggestions.css';
import product1 from '../../assets/HomePage/Suggestions/product1.jpg';
import product2 from '../../assets/HomePage/Suggestions/product2.jpg';
import product3 from '../../assets/HomePage/Suggestions/product3.jpg';
import product4 from '../../assets/HomePage/Suggestions/product4.jpg';


function Suggestions() {
  const products = [
    { name: 'Laptop Dell', price: '7,000,000đ', location: 'Hồ Chí Minh', image: product1 },
    { name: 'Bình nước Ln', price: '287,000đ', location: 'Bình Dương', image: product2 },
    { name: 'Sữa rửa mặt', price: '62,900đ', location: 'Hồ Chí Minh', image: product3 },
    { name: 'Laptop Lenovo', price: '23,000,000đ', location: 'Hồ Chí Minh', image: product4 },
  ];

  return (
    <div className="suggestions">
      <h2>Gợi ý cho bạn</h2>
      <div className="product-grid">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
            <p>{product.price}</p>
            <p>{product.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Suggestions;
