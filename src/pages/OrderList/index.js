import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import Button from "../../components/Button";
import styles from "./OrderListPage.module.css";
import axiosInstance from "../axiosInstance";
import Header from "../../components/Layout/conponent/Header";

const cx = classNames.bind(styles);

const OrderListPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch thông tin sản phẩm cho mỗi đơn hàng
    const fetchProductDetails = async (productid) => {
        try {
            // Gọi API để lấy thông tin sản phẩm theo productid
            const response = await axiosInstance.get(`http://localhost:3001/products/getProductById?productid=${productid}`);
            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message);
            }
        } catch (err) {
            console.error("Lỗi khi lấy thông tin sản phẩm:", err);
            return null;
        }
    };

    useEffect(() => {
        const fetchOrders = async () => {
            const userid = localStorage.getItem("userid");
            if (!userid) {
                setError("Vui lòng đăng nhập để xem danh sách đơn hàng!");
                setLoading(false);
                return;
            }
            try {
                // Lấy danh sách đơn hàng
                const response = await axiosInstance.get(`http://localhost:3001/order/getOrder/${userid}`);
                if (response.data.success) {
                    // Sau khi lấy đơn hàng, lấy thêm thông tin sản phẩm cho mỗi đơn hàng
                    const ordersWithProductDetails = await Promise.all(
                        response.data.data.map(async (order) => {
                            const productDetails = await fetchProductDetails(order.productid);
                            return {
                                ...order,
                                productDetails,
                            };
                        })
                    );
                    setOrders(ordersWithProductDetails);
                } else {
                    setError(response.data.message || "Không thể lấy danh sách đơn hàng!");
                }
            } catch (err) {
                setError(err.response?.data?.message || "Lỗi khi kết nối với server!");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    // Handle loading and error states
    if (loading) {
        return <div className={cx("loading")}>Đang tải...</div>;
    }

    if (error) {
        return (
            <div className={styles.error}>
                <p>{error}</p>
                <Button onClick={() => window.location.reload()}>Thử lại</Button>
            </div>
        );
    }

    // Handle no orders
    return (
        <div>
            <Header />
            <div className={cx("orderListPage")}>
                <h1>Danh sách đơn hàng đã đặt</h1>
                {orders.length === 0 ? (
                    <p>Không có đơn hàng nào!</p>
                ) : (
                    <ul className={cx("orderList")}>
                        {orders.map((order) => (
                            <li key={order.orderid} className={cx("orderItem")}>
                                <div className={cx("orderInfo")}>
                                    {/* Column 1: Product Image */}
                                    <div className={cx("column")}>
                                        <img 
                                            src={order.productDetails?.image || "default-image-url"} 
                                            alt={order.productDetails?.name} 
                                            className={cx("product-image")} 
                                        />
                                    </div>

                                    {/* Column 2: Product Details */}
                                    <div className={cx("column")}>
                                        <p><strong>Sản phẩm:</strong> {order.productDetails?.name}</p>
                                        <p><strong>Số lượng:</strong> {order.quantity}</p>
                                        <p><strong>Giá:</strong> {order.productDetails?.price.toLocaleString()}đ</p>
                                    </div>

                                    {/* Column 3: Status & Total */}
                                    <div className={cx("column")}>
                                        <p><strong>Trạng thái:</strong> 
                                            {order.productDetails?.status === 'ForSale' ? 'Đang kinh doanh' :
                                             order.productDetails?.status === 'Sold' ? 'Đã bán hết' :
                                             order.productDetails?.status === 'Deleted' ? 'Đã bị xóa' : 'Trạng thái không xác định'}
                                        </p>
                                        <p><strong>Mô tả sản phẩm:</strong> {order.productDetails?.description}</p>
                                        <p><strong>Tổng tiền:</strong> {order.totalprice.toLocaleString()}đ</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default OrderListPage;
