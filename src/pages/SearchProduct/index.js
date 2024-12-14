import React from "react";
import { useLocation } from "react-router-dom";
import ProductList from "../../components/ProductList";
import styles from "./SearchProduct.module.css";
import Header from "../../components/Layout/conponent/Header";

const SearchProduct = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get("category");
  const searchName = searchParams.get("name");

  return (
    <div>
      <Header />
      <div className={styles.searchPage}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            {categoryId
              ? `Sản phẩm thuộc danh mục ${categoryId}`
              : searchName
              ? `Kết quả tìm kiếm cho "${searchName}"`
              : "Danh sách sản phẩm"}
          </h1>
          <ProductList categoryId={categoryId} searchName={searchName} />
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;
