import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard";
import styles from "./ProductList.module.css";

const ProductList = ({ categoryId, searchName }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log(categoryId+searchName);
        let apiUrl = "http://localhost:3001/";

        // Kiểm tra categoryId và searchName
        if (categoryId) {
          apiUrl += `category/getProductbyCategory/${categoryId}`; // Tìm sản phẩm theo category
        } else if (searchName) {
          // Thêm query parameter vào URL cho tìm kiếm theo tên
          apiUrl += `products/search?name=${encodeURIComponent(searchName)}`;
        } else {
          apiUrl += `products/getAllProduct`; // Nếu không có gì, lấy tất cả sản phẩm
        }
        console.log(apiUrl);
        // Gửi yêu cầu API
        const response = await fetch(apiUrl);
        const data = await response.json(); // Đọc dữ liệu từ API dưới dạng JSON

        // Kiểm tra nếu API trả về thành công
        if (data.success) {
          setProducts(data.data); // Lưu sản phẩm vào state
        } else {
          setError(data.message || "Không tìm thấy sản phẩm."); // Hiển thị thông báo lỗi nếu có
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Có lỗi xảy ra khi tải dữ liệu."); // Xử lý lỗi nếu không thể kết nối API
      } finally {
        setLoading(false); // Kết thúc quá trình tải
      }
    };

    fetchProducts();
  }, [categoryId, searchName]); // Khi categoryId hoặc searchName thay đổi, gọi lại API

  // Hiển thị khi đang tải dữ liệu
  if (loading) return <div>Đang tải dữ liệu...</div>;

  // Hiển thị khi có lỗi
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.productList}>
      {products.length > 0 ? (
        // Hiển thị sản phẩm nếu có
        products.map((product) => (
          <ProductCard
            key={product.productid}
            id={product.productid}
            image={product.image}
            title={product.name}
            price={product.price}
            location={product.location}
          />
        ))
      ) : (
        // Hiển thị khi không có sản phẩm nào
        <div>Không có sản phẩm nào được tìm thấy.</div>
      )}
    </div>
  );
};

export default ProductList;
