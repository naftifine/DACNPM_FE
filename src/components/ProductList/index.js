import React from "react";
import ProductCard from "../ProductCard";
import styles from "./ProductList.module.css";

const ProductList = ({ products }) => {
    return (
        <div className={styles.productList}>
            {products.length > 0 ? (
                products.map(product => (
                    <ProductCard
                        key={product.id}  // Sử dụng id làm key
                        id={product.id}
                        image="https://via.placeholder.com/200"
                        title={product.PName}
                        price={product.SellPrice}  // Giả sử product có thuộc tính Price
                        location={product.Location}  // Giả sử product có thuộc tính Location
                    />
                ))
            ) : (
                <p>No products found.</p>
            )}
        </div>
    );
};

export default ProductList;
