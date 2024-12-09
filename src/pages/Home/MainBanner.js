import React from 'react';
import './MainBanner.css';
import banner1 from '../../assets/HomePage/Banners/Banner1.jpg';
import banner2 from '../../assets/HomePage/Banners/Banner2.jpg';
import banner3 from '../../assets/HomePage/Banners/Banner3.jpg';

function MainBanner() {
  const products = [
    { name: 'Banner 1', image: banner1 },
    { name: 'Banner 2', image: banner2 },
    { name: 'Banner 3', image: banner3 },
  ];

  return (
    <div className="MainBanner">
      {products.map((product, index) => (
        <img key={product.name || index} src={product.image} alt={product.name} />
      ))}
    </div>
  );
}

export default MainBanner;
