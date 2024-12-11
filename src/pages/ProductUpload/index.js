import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from './ProductUpload.module.css';
import Button from '../../components/Button';
import Header from '../../components/Layout/conponent/Header';

const ProductUpload = () => {
    const navigate = useNavigate(); // Khởi tạo useNavigate
    const [form, setForm] = useState({
        productName: '',
        price: '',
        address: '',
        description: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Product Uploaded:', form);
        // Thực hiện API call tại đây
    };

    const handleCancel = () => {
        navigate(-1); // Quay lại trang trước đó
    };

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <h1 className={styles.title}>Đăng tin sản phẩm</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.imageUpload}>
                        <label className={styles.imageLabel}>Hình ảnh sản phẩm</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            className={styles.imageInput}
                        />
                        <p className={styles.imageHint}>Đăng từ 1-6 ảnh</p>
                    </div>
                    <div className={styles.infoSection}>
                        <label>Tên sản phẩm</label>
                        <input
                            type="text"
                            name="productName"
                            value={form.productName}
                            onChange={handleInputChange}
                            placeholder="Tên sản phẩm"
                            required
                        />

                        <label>Giá bán</label>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleInputChange}
                            placeholder="Giá bán"
                            required
                        />

                        <label>Địa chỉ</label>
                        <input
                            type="text"
                            name="address"
                            value={form.address}
                            onChange={handleInputChange}
                            placeholder="Địa chỉ"
                            required
                        />

                        <label>Mô tả chi tiết</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleInputChange}
                            placeholder="Mô tả chi tiết sản phẩm"
                            required
                        />
                    </div>

                </form>
                <div className={styles.buttonGroup}>
                    <Button outline large type="button" onClick={handleCancel} className={styles.cancelButton}>
                        Hủy
                    </Button>
                    <Button primary large type="submit" className={styles.submitButton}>
                        Đăng tin
                    </Button>

                </div>
            </div>
        </div>
    );
};

export default ProductUpload;
