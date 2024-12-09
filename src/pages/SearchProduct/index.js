import React, { useState, useEffect } from "react";
import ProductList from "../../components/ProductList";
import styles from "./SearchProduct.module.css";
import Header from "../../components/Layout/conponent/Header";

const SearchProduct = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://tiktok.fullstack.edu.vn/api/users/search?q=hoaa&type=less"); // Replace with dynamic query
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div><Header />
            <div className={styles.searchPage}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Danh sách sản phẩm</h1>
                    <ProductList products={products} />
                </div>
            </div>
        </div>
    );
};

export default SearchProduct;
