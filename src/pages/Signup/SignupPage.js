import React, { useState } from 'react';
import axios from 'axios';
import './SignupPage.css';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Header from '../../components/Layout/conponent/Header';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    cccd: '',
    dateofbirth: '',
    fullname: '',
    phonenumber: ''
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Hàm cập nhật giá trị input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Kiểm tra thông tin nhập vào trước khi gửi
  const validateForm = () => {
    const phoneRegex = /^[0-9]{10,}$/;
    const cccdRegex = /^[0-9]{12}$/;

    if (
      !formData.username || !formData.password || !formData.confirmPassword ||
      !formData.cccd || !formData.dateofbirth || !formData.fullname || !formData.phonenumber
    ) {
      setError('Vui lòng điền đầy đủ thông tin.');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu và xác nhận mật khẩu không khớp.');
      return false;
    }

    if (!cccdRegex.test(formData.cccd)) {
      setError('CCCD phải là 12 chữ số.');
      return false;
    }

    if (!phoneRegex.test(formData.phonenumber)) {
      setError('Số điện thoại phải có ít nhất 10 chữ số.');
      return false;
    }

    return true;
  };

  // Hàm xử lý khi người dùng submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { confirmPassword, ...dataToSend } = formData;

      const response = await axios.post('http://localhost:3001/auth/register', dataToSend);
      alert('Đăng ký thành công!');
      console.log(response.data);
      navigate('/login');
    } catch (err) {
      setError('Có lỗi xảy ra. Vui lòng thử lại!');
      console.error(err);
    }

    setIsSubmitting(false);
  };

  return (
    <div><Header />
      <div className="signup-page">
        <div className="signup-container">
          <h1>Đăng ký</h1>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-columns">
              {/* Cột 1 */}
              <div className="form-column">
                <div className="input-field">
                  <label className="input-label">Tên đăng nhập</label>
                  <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div className="input-field">
                  <label className="input-label">Mật khẩu</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="input-field">
                  <label className="input-label">Xác nhận mật khẩu</label>
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                </div>
                <div className="input-field">
                  <label className="input-label">CCCD</label>
                  <input type="text" name="cccd" value={formData.cccd} onChange={handleChange} required />
                </div>
              </div>

              {/* Cột 2 */}
              <div className="form-column">
                <div className="input-field">
                  <label className="input-label">Ngày sinh</label>
                  <input type="date" name="dateofbirth" value={formData.dateofbirth} onChange={handleChange} required />
                </div>
                <div className="input-field">
                  <label className="input-label">Họ và tên</label>
                  <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} required />
                </div>
                <div className="input-field">
                  <label className="input-label">Số điện thoại</label>
                  <input type="text" name="phonenumber" value={formData.phonenumber} onChange={handleChange} required />
                </div>
                <Button primary type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Đang xử lý...' : 'Đăng ký'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
