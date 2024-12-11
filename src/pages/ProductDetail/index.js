import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./ProductDetail.module.css";
import Button from "../../components/Button";
import Header from "../../components/Layout/conponent/Header";
const cx = classNames.bind(styles);


const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const handleBuyNow = () => {
        navigate(`/order/${id}`); // Điều hướng đến trang đặt hàng
    };

    // Dữ liệu từ ProductList
    const products = [
        {
            id: 1,
            image: "https://via.placeholder.com/200",
            title: "Iphone 14 Pro Max 128GB Gold",
            price: "14,500,000",
            location: "TP Hồ Chí Minh",
            description: "Máy còn bảo hành 12 tháng, tình trạng mới 99%.",
            contact: "0123456789",
            seller: "Nguyễn Văn Tèo",
            rating: 4.9,
        },
        {
            id: 2,
            image: "https://via.placeholder.com/200",
            title: "Laptop Dell XPS 13 - Core i7, 16GB RAM, SSD 512GB",
            price: "25,000,000",
            location: "Hà Nội",
            description: "Laptop mỏng nhẹ, hiệu năng cao.",
            contact: "0987654321",
            seller: "Trần Văn Bình",
            rating: 4.8,
        },
        {
            id: 3,
            image: "https://via.placeholder.com/200",
            title: "Bộ bàn ghế gỗ phòng khách cao cấp",
            price: "12,000,000",
            location: "Đà Nẵng",
            description: "Bàn ghế gỗ đẹp, phong cách hiện đại.",
            contact: "0932123456",
            seller: "Lê Thị Hoa",
            rating: 4.7,
        },
    ];

    // Tìm sản phẩm theo ID
    const product = products.find((p) => p.id === parseInt(id));

    if (!product) {
        return <div className={styles.error}>Không tìm thấy sản phẩm!</div>;
    }

    return (
        <div><Header />
            <div className={cx("productDetail")}>
                <div className={cx("productHeader")}>
                    <img src={product.image} alt={product.title} className={styles.productImage} />
                    <div className={cx("productInfo")}>
                        <h1>{product.title}</h1>
                        <p className={cx("price")}>Giá: {product.price}đ</p>
                        <p>Địa điểm: {product.location}</p>
                        <div className={cx("contact")}>
                            <Button outline large className={cx("seller")}>{product.seller}</Button>
                            <Button text large className={cx("phonenumber")}>{product.contact}</Button>
                        </div>


                        <p>Đánh giá: {product.rating} ⭐</p>
                    </div>
                </div>
                <div className={cx("productDescription")}>
                    <h2>Mô tả sản phẩm</h2>
                    <p>{product.description}</p>
                </div>
                <Button primary onClick={handleBuyNow} className={cx("buy")}>Mua ngay</Button>
            </div>
        </div>
    );
};

export default ProductDetail;
