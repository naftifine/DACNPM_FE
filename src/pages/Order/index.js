import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import Button from "../../components/Button";
import styles from "./OrderPage.module.css";
import Header from "../../components/Layout/conponent/Header";
import axiosInstance from "../axiosInstance"; // Import axiosInstance

const cx = classNames.bind(styles);

const OrderPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [user, setUser] = useState(null);
    const [seller, setSeller] = useState(null); // New state for seller
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState(null);
    const shippingFee = 40000;

    const totalPrice = product ? product.price * quantity + shippingFee : 0;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3001/products/getProductById?productid=${id}`);
                const data = await response.json();
                if (data.success) {
                    setProduct(data.data);
                    fetchSeller(data.data.userID);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError("Lỗi kết nối với server!");
            }
        };

        const fetchSeller = async (userid) => {
            try {
                const response = await axiosInstance.post(`http://localhost:3001/users/getById`,{userid});
                if (response.data) {
                    setSeller(response.data);
                } else {
                    setError("Không thể lấy thông tin người bán!");
                }
            } catch (err) {
                setError("Lỗi khi lấy thông tin người bán!");
            }
        };

        const fetchUser = async () => {
            const accessToken = localStorage.getItem("accessToken");
            const username = localStorage.getItem("username");
            if (!accessToken) {
                setError("Access Token is missing.");
                return;
            }

            try {
                const response = await axiosInstance.post("http://localhost:3001/users/profile", { username });
                if (response.data) {
                    setUser(response.data);
                } else {
                    throw new Error("Invalid data format");
                }
            } catch (error) {
                console.error("Error fetching user info:", error.message);
                setError("Failed to fetch user info.");
            }
        };

        fetchProduct();
        fetchUser();
    }, [id]);

    const handleQuantityChange = (e) => {
        setQuantity(Number(e.target.value));
    };

    const handleSubmitOrder = () => {
        alert("Đặt hàng thành công!");
    };

    const handleCancelOrder = () => {
        navigate(-1);
    };

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    if (!product) {
        return <div className={styles.error}>Không tìm thấy sản phẩm!</div>;
    }

    if (!user) {
        return <div className={styles.error}>Không tìm thấy thông tin người dùng!</div>;
    }

    if (!seller) {
        return <div className={styles.error}>Không tìm thấy thông tin người bán!</div>;
    }

    return (
        <div>
            <Header />
            <div className={cx("wrapper")}>
                <div className={cx("orderPage")}>
                    <div className={cx("orderHeader")}>
                        <img src={product.image} alt={product.title} className={styles.productImage} />
                        <div className={cx("productInfo")}>
                            <h1>{product.name}</h1>
                            <p>Đơn giá: {product.price.toLocaleString()}đ</p>
                            <p>Số lượng còn lại: {product.remaining_amount}</p>
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
                                <p>Thành tiền: {(product.price * quantity).toLocaleString()}đ</p>
                            </div>
                        </div>
                        <div className={cx("productInfo")}>
                            <h2>Người bán: {seller.fullname}</h2>
                            <p>Số điện thoại: {seller.phonenumber}</p>
                        </div>
                    </div>

                    <div className={cx("orderDetails")}>
                        <h2>Thông tin nhận hàng</h2>
                        <div className={cx("contact")}>
                            <span>Liên hệ</span>
                            <input placeholder="Họ và tên" value={user.fullname || ''} />
                            <input placeholder="Số điện thoại" value={user.phonenumber || ''} />
                        </div>

                        <div className={cx("address")}>
                            <span>Địa chỉ</span>
                            <input placeholder="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã" />
                            <input placeholder="Tên đường, Tòa nhà, Số nhà" />
                        </div>

                        <div className={cx("sellerInfo")}>
                            <h2>Thông tin người bán</h2>
                            <p>Tên người bán: {seller.fullname}</p>
                            <p>Số điện thoại: {seller.phonenumber}</p>
                            <p>Địa chỉ: {seller.address}</p>
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



// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import classNames from "classnames/bind";
// import Button from "../../components/Button";
// import styles from "./OrderPage.module.css";
// import Header from "../../components/Layout/conponent/Header";
// import axiosInstance from "../axiosInstance"; // Import axiosInstance

// const cx = classNames.bind(styles);

// const OrderPage = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [product, setProduct] = useState(null);
//     const [user, setUser] = useState(null);
//     const [seller, setSeller] = useState(null);
//     const [quantity, setQuantity] = useState(1);
//     const [error, setError] = useState(null);
//     const shippingFee = 40000;

//     const totalPrice = product ? product.price * quantity + shippingFee : 0;

//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 const response = await fetch(`http://localhost:3001/products/getProductById?productid=${id}`);
//                 const data = await response.json();
//                 if (data.success) {
//                     setProduct(data.data);
//                     fetchSeller(data.data.userID);
//                 } else {
//                     setError(data.message);
//                 }
//             } catch (err) {
//                 setError("Lỗi kết nối với server!");
//             }
//         };

//         const fetchSeller = async (userid) => {
//             try {
//                 const response = await axiosInstance.post(`http://localhost:3001/users/getById`, { userid });
//                 if (response.data) {
//                     setSeller(response.data);
//                 } else {
//                     setError("Không thể lấy thông tin người bán!");
//                 }
//             } catch (err) {
//                 setError("Lỗi khi lấy thông tin người bán!");
//             }
//         };

//         const fetchUser = async () => {
//             const accessToken = localStorage.getItem("accessToken");
//             const username = localStorage.getItem("username");
//             if (!accessToken) {
//                 setError("Access Token is missing.");
//                 return;
//             }

//             try {
//                 const response = await axiosInstance.post("http://localhost:3001/users/profile", { username });
//                 if (response.data) {
//                     setUser(response.data);
//                 } else {
//                     throw new Error("Invalid data format");
//                 }
//             } catch (error) {
//                 console.error("Error fetching user info:", error.message);
//                 setError("Failed to fetch user info.");
//             }
//         };

//         fetchProduct();
//         fetchUser();
//     }, [id]);

//     const handleQuantityChange = (e) => {
//         setQuantity(Number(e.target.value));
//     };

//     const handleSubmitOrder = async () => {
//         if (!user || !product) {
//             alert("Thông tin không đầy đủ để đặt hàng!");
//             return;
//         }

//         const orderdata = {
//             productid: product.id, // Product ID
//             userid: user.id, // Buyer (user) ID
//             sellerid: seller.id, // Seller ID
//             quantity, // Quantity of the product being ordered
//             totalprice, // Total price including shipping
//             shippingfee, // Shipping fee
//             shippingAddress: {
//                 province: document.querySelector('input[placeholder="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"]').value.trim(),
//                 street: document.querySelector('input[placeholder="Tên đường, Tòa nhà, Số nhà"]').value.trim(),
//             },
//             buyerNote: document.querySelector('textarea[placeholder="Lời nhắn cho người bán"]').value.trim(),
//         };

//         try {
//             const response = await axiosInstance.post("http://localhost:3001/orders/create", orderData);

//             if (response.data && response.data.success) {
//                 alert("Đặt hàng thành công!");
//                 navigate("/orders"); // Redirect to an order confirmation or list page
//             } else {
//                 alert(response.data.message || "Đặt hàng thất bại!");
//             }
//         } catch (error) {
//             console.error("Error submitting order:", error.message);
//             alert("Lỗi khi gửi đơn hàng! Vui lòng thử lại.");
//         }
//     };

//     const handleCancelOrder = () => {
//         navigate(-1);
//     };

//     if (error) {
//         return <div className={styles.error}>{error}</div>;
//     }

//     if (!product) {
//         return <div className={styles.error}>Không tìm thấy sản phẩm!</div>;
//     }

//     if (!user) {
//         return <div className={styles.error}>Không tìm thấy thông tin người dùng!</div>;
//     }

//     if (!seller) {
//         return <div className={styles.error}>Không tìm thấy thông tin người bán!</div>;
//     }

//     return (
//         <div>
//             <Header />
//             <div className={cx("wrapper")}>
//                 <div className={cx("orderPage")}>
//                     <div className={cx("orderHeader")}>
//                         <img src={product.image} alt={product.title} className={styles.productImage} />
//                         <div className={cx("productInfo")}>
//                             <h1>{product.title}</h1>
//                             <p>Đơn giá: {product.price.toLocaleString()}đ</p>
//                             <p>Số lượng còn lại: {product.remaining_amount}</p>
//                             <div className={cx("productSummary")}>
//                                 <div>
//                                     <p>Số lượng:
//                                         <input
//                                             type="number"
//                                             min="1"
//                                             value={quantity}
//                                             onChange={handleQuantityChange}
//                                             className={cx("quantityInput")}
//                                         />
//                                     </p>
//                                 </div>
//                                 <p>Thành tiền: {(product.price * quantity).toLocaleString()}đ</p>
//                             </div>
//                         </div>
//                         <div className={cx("productInfo")}>
//                             <h2>Người bán: {seller.fullname}</h2>
//                             <p>Số điện thoại: {seller.phonenumber}</p>
//                         </div>
//                     </div>

//                     <div className={cx("orderDetails")}>
//                         <h2>Thông tin nhận hàng</h2>
//                         <div className={cx("contact")}>
//                             <span>Liên hệ</span>
//                             <input placeholder="Họ và tên" value={user.fullname || ''} readOnly />
//                             <input placeholder="Số điện thoại" value={user.phonenumber || ''} readOnly />
//                         </div>

//                         <div className={cx("address")}>
//                             <span>Địa chỉ</span>
//                             <input placeholder="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã" />
//                             <input placeholder="Tên đường, Tòa nhà, Số nhà" />
//                         </div>

//                         <div className={cx("sellerInfo")}>
//                             <h2>Thông tin người bán</h2>
//                             <p>Tên người bán: {seller.fullname}</p>
//                             <p>Số điện thoại: {seller.phonenumber}</p>
//                             <p>Địa chỉ: {seller.address}</p>
//                         </div>

//                         <div className={cx("orderSummary")}>
//                             <h2>Chi tiết thanh toán</h2>

//                             <div className={cx("shippingDetails")}>
//                                 <p>Phí vận chuyển: {shippingFee.toLocaleString()}đ</p>
//                                 <p>Tổng tiền hàng: {(product.price * quantity).toLocaleString()}đ</p>
//                                 <p>Tổng thanh toán: {totalPrice.toLocaleString()}đ</p>
//                             </div>
//                         </div>

//                         <div className={cx("message")}>
//                             <textarea placeholder="Lời nhắn cho người bán" />
//                         </div>
//                         <div className={cx("buttonGroup")}>
//                             <Button outline className={cx("placeOrderButton")} onClick={handleCancelOrder}>Quay lại</Button>
//                             <Button primary className={cx("placeOrderButton")} onClick={handleSubmitOrder}>Đặt hàng</Button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
