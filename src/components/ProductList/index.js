import React from "react";
import ProductCard from "../ProductCard";
import styles from "./ProductList.module.css";

const ProductList = () => {
    const products = [
        {
            id: 1,
            image: "https://via.placeholder.com/200",
            title: "Iphone 14 Pro Max 128GB Gold",
            price: "14,500,000",
            location: "TP Hồ Chí Minh",
        },
        {
            id: 2,
            image: "https://via.placeholder.com/200",
            title: "Laptop Dell XPS 13 - Core i7, 16GB RAM, SSD 512GB",
            price: "25,000,000",
            location: "Hà Nội",
        },
        {
            id: 3,
            image: "https://via.placeholder.com/200",
            title: "Bộ bàn ghế gỗ phòng khách cao cấp",
            price: "12,000,000",
            location: "Đà Nẵng",
        },
        // Thêm nhiều sản phẩm...
    ];

    return (
        <div className={styles.productList}>
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    id={product.id} // Truyền id
                    image={product.image}
                    title={product.title}
                    price={product.price}
                    location={product.location}
                />
            ))}
        </div>
    );
};

export default ProductList;
