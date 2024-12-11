import React from "react";
import ProductList from "../../components/ProductList";
import styles from "./SearchProduct.module.css";
import Header from "../../components/Layout/conponent/Header";

const SearchProduct = () => {
    return (
        <div><Header />
            <div className={styles.searchPage}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Danh sách sản phẩm</h1>
                    <ProductList />
                </div>
            </div>
        </div>
    );
};

export default SearchProduct;
