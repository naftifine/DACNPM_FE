import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./ProductDetail.module.css";
import Button from "../../components/Button";
import Header from "../../components/Layout/conponent/Header";

const cx = classNames.bind(styles);

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null); // state để lưu dữ liệu sản phẩm
    const [loading, setLoading] = useState(true); // state để quản lý trạng thái tải dữ liệu
    const [error, setError] = useState(null); // state để quản lý lỗi

    // Hàm xử lý mua ngay
    const handleBuyNow = () => {
        navigate(`/order/${id}`); // Điều hướng đến trang đặt hàng
    };

    useEffect(() => {
        // Gọi API khi component được render
        axios.get(`https://6756814811ce847c992cfa8f.mockapi.io/api/products/${id}`)
            .then((response) => {
                setProduct(response.data); // Lưu dữ liệu vào state
                setLoading(false); // Đánh dấu là đã tải xong
            })
            .catch((error) => {
                setError("Không thể tải sản phẩm.");
                setLoading(false);
            });
    }, [id]); // Chỉ gọi lại khi id thay đổi

    if (loading) {
        return <div>Đang tải...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!product) {
        return <div className={styles.error}>Không tìm thấy sản phẩm!</div>;
    }

    return (
        <div>
            <Header />
            <div className={cx("productDetail")}>
                <div className={cx("productHeader")}>
                    <img src="https://via.placeholder.com/200" alt={product.PName} className={styles.productImage} />
                    <div className={cx("productInfo")}>
                        <h1>{product.PName}</h1>
                        <p className={cx("price")}>Giá: {product.SellPrice}đ</p>
                        <p>Địa điểm: {product.location}</p>
                        <div className={cx("contact")}>
                            <Button outline large className={cx("seller")}>{product.SellerID}</Button>
                            <Button text large className={cx("phonenumber")}>{product.contact}</Button>
                        </div>
                        <p>Đánh giá: {product.rating} ⭐</p>
                    </div>
                </div>
                <div className={cx("productDescription")}>
                    <h2>Mô tả sản phẩm</h2>
                    <p>{product.Pr_Descr}</p>
                </div>
                <Button primary onClick={handleBuyNow} className={cx("buy")}>Mua ngay</Button>
            </div>
        </div>
    );
};

export default ProductDetail;
