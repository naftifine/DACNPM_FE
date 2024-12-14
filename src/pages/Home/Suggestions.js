import React from 'react';
import './Suggestions.css';
import product1 from '../../assets/HomePage/Suggestions/product1.jpg';
import product2 from '../../assets/HomePage/Suggestions/product2.jpg';
import product3 from '../../assets/HomePage/Suggestions/product3.jpg';
import product4 from '../../assets/HomePage/Suggestions/product4.jpg';

function Suggestions() {
  return (
    <div className="suggestions">
      <h2>Gợi ý cho bạn</h2>
      <div className="product-grid">
        <div className="product-card">
          <a href="/product/2" className='product-link'>
            <img src={product1} alt="Laptop" />
            <span>Laptop</span>
          </a>
        </div>
        <div className="product-card">
          <a href="/product/27" className='product-link'>
            <img src={product2} alt="Bình nước" />
            <span>Bình nước</span>
          </a>
        </div>
        <div className="product-card">
          <a href="/product/12" className='product-link'>
            <img src={product3} alt="Sữa rửa mặt" />
            <span>Sữa rửa mặt</span>
          </a>
        </div>
        <div className="product-card">
          <a href="/product/4" className='product-link'>
            <img src={product4} alt="Tai nghe" />
            <span>Tai nghe D</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Suggestions;
