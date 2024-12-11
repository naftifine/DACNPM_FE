import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import Button from "../../components/Button";
import styles from "./OrderPage.module.css";
import Header from "../../components/Layout/conponent/Header";

const cx = classNames.bind(styles);

const OrderPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();


    // Giả sử bạn lấy thông tin sản phẩm từ một API hoặc dữ liệu tĩnh
    const product = {
        id: id,
        image: "https://via.placeholder.com/200",
        title: "Iphone 14 128GB Màu Trắng",
        price: 14000000,
        location: "TP Hồ Chí Minh",
        seller: "Trần Quang Huy",
        contact: "0123456789",
    };

    const [quantity, setQuantity] = useState(1); // Quản lý số lượng
    const shippingFee = 40000; // Phí vận chuyển
    const totalPrice = product.price * quantity + shippingFee; // Tính tổng tiền

    const handleQuantityChange = (e) => {
        setQuantity(Number(e.target.value));
    };

    const handleSubmitOrder = () => {
        alert("Đặt hàng thành công!");
    };

    const handleCancelOrder = () => {
        navigate(-1); // Quay lại trang trước đó
    };


    return (
        <div><Header />
            <div className={cx("wrapper")}>
                <div className={cx("orderPage")}>
                    <div className={cx("orderHeader")}>
                        <img src={product.image} alt={product.title} className={styles.productImage} />
                        <div className={cx("productInfo")}>
                            <h1>{product.title}</h1>
                            <p>Đơn giá: {product.price.toLocaleString()}đ</p>
                            <p>Địa điểm: {product.location}</p>
                            <div className={cx("productSummary")}>
                                <div>
                                    <p>Số lượng:
                                        <input
                                            type="number"
                                            min="1"
                                            value={quantity}
                                            onChange={handleQuantityChange}
                                            className={cx("quantityInput")}
                                        />
                                    </p>
                                </div>
                                <p>Thành tiền: {product.price * quantity}đ</p>
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
                                <p>Tổng tiền hàng: {product.price * quantity}đ</p>
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
