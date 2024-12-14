import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductUpload.module.css';
import Button from '../../components/Button';
import Header from '../../components/Layout/conponent/Header';
import axiosInstance from '../axiosInstance';

const ProductUpload = () => {
    const navigate = useNavigate(); // Initialize navigate
    const [form, setForm] = useState({
        name: '',
        price: '',
        remaining_amount: '',
        description: '',
        attribute: '',
        categoryid: '',
        userid: '',
    });
    const [image, setImage] = useState(null); // Handle single image upload
    const [categories, setCategories] = useState([]); // Lưu danh sách danh mục
    const [successMessage, setSuccessMessage] = useState(''); // State for success message

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:3001/category/getListCategory");
                const data = await response.json();
                setCategories(data.data); // Lưu danh sách category vào state
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // Save the base64 URL of the image
            };
            reader.readAsDataURL(file); // Convert image to base64
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userid = localStorage.getItem("userid");
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('price', form.price);
        formData.append('remaining_amount', form.remaining_amount);
        formData.append('description', form.description);
        formData.append('attribute', form.attribute);
        formData.append('categoryid', form.categoryid);  // categoryid sẽ là giá trị từ dropdown
        formData.append('userID', userid);

        if (image) {
            formData.append('image', image); // Send base64 image URL to the backend
        }

        try {
            const response = await axiosInstance.post('http://localhost:3001/products/addProduct', formData);
            if (response.data.success) {
                console.log('Product uploaded:', response.data.data);
                setSuccessMessage('Sản phẩm đã được tạo thành công!'); // Set success message
                setTimeout(() => {
                    navigate('/accessnewspage'); // Navigate after 2 seconds
                }, 2000);
            } else {
                console.error('Error uploading product:', response.data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCancel = () => {
        navigate(-1); // Navigate to the previous page
    };

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <h1 className={styles.title}>Đăng bán sản phẩm</h1>
                {successMessage && (
                    <div className={styles.successMessage}>
                        {successMessage}
                    </div>
                )}
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.imageUpload}>
                        <label className={styles.imageLabel}>Hình ảnh sản phẩm</label>
                        <input
                            type="file"
                            accept="image/*"
                            className={styles.imageInput}
                            onChange={handleImageChange}
                            required
                        />
                        {image && (
                            <div className={styles.imagePreview}>
                                <img src={image} alt="Product Preview" className={styles.previewImage} />
                            </div>
                        )}
                        <p className={styles.imageHint}>Đăng 1 ảnh làm ảnh đại diện</p>
                    </div>

                    <div className={styles.infoSection}>
                        <label>Tên sản phẩm</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
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

                        <label>Số lượng</label>
                        <input
                            type="number"
                            name="remaining_amount"
                            value={form.remaining_amount}
                            onChange={handleInputChange}
                            placeholder="Số lượng còn lại"
                            required
                        />

                        {/* Dropdown select for category */}
                        <div className="select-container">
                            <label>Danh mục sản phẩm</label>
                            <select
                                name="categoryid"
                                value={form.categoryid}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="" disabled>Chọn danh mục</option>
                                {categories.map((category) => (
                                    <option key={category.categoryid} value={category.categoryid}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <label>Thuộc tính</label>
                        <input
                            type="text"
                            name="attribute"
                            value={form.attribute}
                            onChange={handleInputChange}
                            placeholder="Thuộc tính sản phẩm"
                        />

                        <label>Mô tả chi tiết</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleInputChange}
                            placeholder="Mô tả chi tiết sản phẩm"
                            required
                        />
                        <div className={styles.buttonGroup}>
                        <Button outline large type="button" onClick={handleCancel} className={styles.cancelButton}>
                            Hủy
                        </Button>
                        <Button primary large type="submit" className={styles.submitButton}>
                            Đăng bán
                        </Button>
                    </div>
                    </div>

                    
                </form>
            </div>
        </div>
    );
};

export default ProductUpload;
