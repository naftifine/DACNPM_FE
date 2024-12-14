import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./ProductDetail.module.css";
import Button from "../../components/Button";
import Header from "../../components/Layout/conponent/Header";

const cx = classNames.bind(styles);

const ProductDetail = () => {
    const { id } = useParams(); // Lấy id từ URL params
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);  // Lưu thông tin sản phẩm
    const [loading, setLoading] = useState(true);  // Trạng thái tải dữ liệu
    const [error, setError] = useState(null);  // Trạng thái lỗi

    // Handle mua ngay
    const handleBuyNow = () => {
        navigate(`/order/${id}`); // Điều hướng đến trang đặt hàng
    };

    // Fetch dữ liệu sản phẩm từ API khi component mount
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                // Fetch dữ liệu từ API theo ID
                const response = await fetch(`http://localhost:3001/products/getProductById?productid=${id}`);
                const data = await response.json();

                // Kiểm tra xem API trả về có thành công không
                if (data.success) {
                    setProduct(data.data);  // Lưu dữ liệu sản phẩm vào state
                } else {
                    setError(data.message);  // Nếu có lỗi từ API
                }
            } catch (err) {
                setError("Lỗi kết nối với server!");  // Lỗi khi gọi API
            } finally {
                setLoading(false);  // Đã hoàn tất tải dữ liệu
            }
        };

        fetchProductDetails();  // Gọi hàm fetch khi component mount
    }, [id]); // Dependency array là id, khi thay đổi ID sẽ gọi lại API

    // Hiển thị thông báo lỗi nếu có
    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    // Hiển thị loading nếu đang tải dữ liệu
    if (loading) {
        return <div className={styles.loading}>Đang tải sản phẩm...</div>;
    }

    // Nếu không tìm thấy sản phẩm
    if (!product) {
        return <div className={styles.error}>Không tìm thấy sản phẩm!</div>;
    }

    return (
        <div>
            <Header />
            <div className={cx("productDetail")}>
                <div className={cx("productHeader")}>
                    <img src={product.image} alt={product.name} className={styles.productImage} />
                    <div className={cx("productInfo")}>
                        <h1>{product.name}</h1>
                        <p className={cx("price")}>Giá: {product.price}đ</p>
                        <p>Được tạo: {new Date(product.created_at).toLocaleDateString('vi-VN')}</p>
                        {/* <div className={cx("contact")}>
                            <Button outline large className={cx("seller")}>{product.seller}</Button>
                            <Button text large className={cx("phonenumber")}>{product.contact}</Button>
                        </div> */}
                        <p>Tình trạng:
                            {product.status === 'ForSale' ? ' Còn hàng' : 
                            product.status === 'Sold' ? ' Đã bán hết' : 
                            product.status === 'Deleted' ? ' Bị vô hiệu' :""}
                        </p>
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
