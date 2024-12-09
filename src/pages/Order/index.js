import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import classNames from "classnames/bind";

import Button from "../../components/Button";
import styles from "./OrderPage.module.css";
import Header from "../../components/Layout/conponent/Header";

const cx = classNames.bind(styles);

const OrderPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null); // Dữ liệu sản phẩm
    const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
    const [error, setError] = useState(null); // Trạng thái lỗi

    const [quantity, setQuantity] = useState(1); // Quản lý số lượng
    const shippingFee = 40000; // Phí vận chuyển
    const totalPrice = product ? product.SellPrice * quantity + shippingFee : 0; // Tính tổng tiền

    // Gọi API để lấy thông tin sản phẩm
    useEffect(() => {
        axios.get(`https://6756814811ce847c992cfa8f.mockapi.io/api/products/${id}`)
            .then((response) => {
                setProduct(response.data); // Lưu sản phẩm vào state
                setLoading(false); // Tắt trạng thái loading
            })
            .catch((error) => {
                setError("Không thể tải sản phẩm.");
                setLoading(false); // Tắt trạng thái loading
            });
    }, [id]);

    const handleQuantityChange = (e) => {
        setQuantity(Number(e.target.value));
    };

    const handleSubmitOrder = () => {
        alert("Đặt hàng thành công!");
    };

    const handleCancelOrder = () => {
        navigate(-1); // Quay lại trang trước đó
    };

    // Hiển thị trạng thái loading hoặc lỗi
    if (loading) {
        return <div>Đang tải...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!product) {
        return <div>Không tìm thấy sản phẩm!</div>;
    }

    return (
        <div>
            <Header />
            <div className={cx("wrapper")}>
                <div className={cx("orderPage")}>
                    <div className={cx("orderHeader")}>
                        <img src={product.image} alt={product.PName} className={styles.productImage} />
                        <div className={cx("productInfo")}>
                            <h1>{product.PName}</h1>
                            <p>Đơn giá: {Number(product.SellPrice).toLocaleString()}đ</p>
                            <p>Địa điểm: {product.location}</p>
                            <div className={cx("productSummary")}>
                                <div>
                                    <p>
                                        Số lượng:
                                        <input
                                            type="number"
                                            min="1"
                                            value={quantity}
                                            onChange={handleQuantityChange}
                                            className={cx("quantityInput")}
                                        />
                                    </p>
                                </div>
                                <p>Thành tiền: {(product.SellPrice * quantity).toLocaleString()}đ</p>
                            </div>
                        </div>
                    </div>

                    <div className={cx("orderDetails")}>
                        <h2>Thông tin nhận hàng</h2>
                        <div className={cx("contact")}>
                            <span>Liên hệ</span>
                            <input placeholder="Họ và tên" />
                            <input placeholder="Số điện thoại" />
                        </div>

                        <div className={cx("address")}>
                            <span>Địa chỉ</span>
                            <input placeholder="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã" />
                            <input placeholder="Tên đường, Tòa nhà, Số nhà" />
                        </div>

                        <div className={cx("orderSummary")}>
                            <h2>Chi tiết thanh toán</h2>

                            <div className={cx("shippingDetails")}>
                                <p>Phí vận chuyển: {shippingFee.toLocaleString()}đ</p>
                                <p>Tổng tiền hàng: {(product.SellPrice * quantity).toLocaleString()}đ</p>
                                <p>Tổng thanh toán: {totalPrice.toLocaleString()}đ</p>
                            </div>
                        </div>

                        <div className={cx("message")}>
                            <textarea placeholder="Lời nhắn cho người bán" />
                        </div>
                        <div className={cx("buttonGroup")}>
                            <Button outline className={cx("placeOrderButton")} onClick={handleCancelOrder}>Quay lại</Button>
                            <Button primary className={cx("placeOrderButton")} onClick={handleSubmitOrder}>Đặt hàng</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
