import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './../../components/ProductList';  // Đảm bảo đường dẫn đúng

function NewsSection() {
  const [products, setProducts] = useState([]);  // Khởi tạo state chứa sản phẩm

  // Sử dụng useEffect để gọi API khi component được render
  useEffect(() => {
    axios.get('https://6756814811ce847c992cfa8f.mockapi.io/api/products')
      .then((response) => {
        setProducts(response.data);  // Lưu danh sách sản phẩm vào state
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);  // Dùng mảng rỗng để chỉ gọi một lần khi component render

  return (
    <div className="news-section">
      <h2>Bảng tin mới</h2>
      <ProductList products={products} />  {/* Truyền danh sách sản phẩm vào ProductList */}
    </div>
  );
}

export default NewsSection;
