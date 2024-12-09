import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductUpload.module.css';
import Button from '../../components/Button';
import Header from '../../components/Layout/conponent/Header';



const ProductUpload = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        productName: '',
        price: '',
        address: '',
        description: '',
    });

    const [images, setImages] = useState([]); // Lưu trữ file hình ảnh

    // Xử lý thay đổi input text
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    // Lưu trữ danh sách URL ảnh để hiển thị
    const [imagePreviews, setImagePreviews] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files); // Lấy danh sách file
        setImages(files); // Lưu file

        // Đọc file và tạo URL để hiển thị
        const previews = files.map((file) => {
            return URL.createObjectURL(file); // Tạo URL tạm thời cho ảnh
        });
        setImagePreviews(previews); // Cập nhật danh sách ảnh preview
    };

    // Xử lý submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra hình ảnh
        if (images.length === 0) {
            alert('Vui lòng chọn ít nhất 1 hình ảnh.');
            return;
        }

        // Tạo đối tượng chứa dữ liệu cần gửi
        const productData = {
            data: {
                PName: form.productName,
                SellPrice: parseFloat(form.price), // Chuyển giá về dạng số
                Pr_Descr: form.description,
                Amount: 1, // Bạn cần thêm trường số lượng
                TimeUpload: new Date().toISOString(), // Lấy thời gian hiện tại
                ImagePd: images.length > 0 ? '/images/example.jpg' : null, // Placeholder cho đường dẫn ảnh
                Attribute: {
                    "Hãng": "SamSung",
                    "Dòng máy": "Galaxy S20",
                    "Tình trạng": "Like New",
                    "Màu Sắc": "Trắng"
                },
                StatusPro: "ForSale",
                SellerID: 1, // Placeholder cho ID người bán
                PC_ID: 1,    // Placeholder cho ID danh mục
            }
        };

        try {
            // Gửi dữ liệu lên backend
            const response = await fetch(`http://localhost:3000/products/addProduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Định nghĩa loại nội dung là JSON
                },
                body: JSON.stringify(productData), // Chuyển đối tượng thành JSON

            });
            console.log(productData);
            if (response.ok) {
                const result = await response.json();
                console.log('Upload thành công:', result);
                alert('Đăng tin thành công!');
                navigate('/'); // Điều hướng về trang chủ
            } else {
                console.error('Lỗi khi đăng sản phẩm:', await response.text());
                alert('Đăng tin thất bại, vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Lỗi:', error);
            alert('Có lỗi xảy ra, vui lòng thử lại.');
        }
    };


    // Hàm xử lý xóa ảnh
    const handleDeleteImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index); // Loại bỏ file ở index
        const updatedPreviews = imagePreviews.filter((_, i) => i !== index); // Loại bỏ preview ở index
        setImages(updatedImages); // Cập nhật danh sách file
        setImagePreviews(updatedPreviews); // Cập nhật danh sách preview
    };


    // Xử lý hủy bỏ
    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <h1 className={styles.title}>Đăng tin sản phẩm</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.imageUpload}>
                        {imagePreviews.length === 0 && (
                            <label className={styles.imageLabel}>Hình ảnh sản phẩm</label>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            className={styles.imageInput}
                            onChange={handleFileChange} // Lắng nghe thay đổi file
                        />
                        <div className={styles.imagePreviewContainer}>
                            {imagePreviews.map((src, index) => (
                                <div key={src} className={styles.imagePreviewWrapper}> {/* Dùng src làm key */}
                                    <img
                                        src={src}
                                        alt={`Preview ${index + 1}`}
                                        className={styles.imagePreview}
                                    />
                                    <button
                                        type="button"
                                        className={styles.deleteButton}
                                        onClick={(e) => {
                                            e.stopPropagation(); // Ngăn sự kiện lan tới input
                                            handleDeleteImage(index); // Xử lý xóa ảnh
                                        }}
                                    >
                                        &times; {/* Icon dấu nhân */}
                                    </button>
                                </div>
                            ))}

                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                className={styles.imageInput}
                                onChange={handleFileChange} // Lắng nghe thay đổi file
                            />
                        </div>


                        {imagePreviews.length === 0 && (
                            <p className={styles.imageHint}>Đăng từ 1-6 ảnh</p>
                        )}

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
                    <Button
                        outline
                        large
                        type="button"
                        onClick={handleCancel}
                        className={styles.cancelButton}
                    >
                        Hủy
                    </Button>
                    <Button
                        primary
                        large
                        type="submit"
                        onClick={handleSubmit}
                        className={styles.submitButton}
                    >
                        Đăng tin
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductUpload;
