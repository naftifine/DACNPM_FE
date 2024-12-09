import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProductCard.module.css";  // Đảm bảo đường dẫn đúng

const ProductCard = ({ id, image, title, price, location }) => {
    const navigate = useNavigate();

    // Hàm xử lý khi click vào sản phẩm
    const handleClick = () => {
        navigate(`/product/${id}`);  // Điều hướng đến trang chi tiết sản phẩm
    };

    return (
        <div className={styles.productCard} onClick={handleClick}>
            <img src={image} alt={title} className={styles.productImage} />
            <div className={styles.productInfo}>
                <h3 className={styles.productTitle}>{title}</h3>
                <p className={styles.productPrice}>{price}đ</p>
                <p className={styles.productLocation}>{location}</p>
            </div>
        </div>
    );
};

export default ProductCard;
