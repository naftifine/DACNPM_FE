import React, { useState, useEffect } from 'react';
import './InfoAccountPage.css';
import Button from '../../components/Button';
import Header from '../../components/Layout/conponent/Header';
import axiosInstance from '../axiosInstance';

const InfoAccountPage = () => { 
  const accessToken = localStorage.getItem('accessToken');
  const userID = localStorage.getItem('useriD');
  const username = localStorage.getItem('username');

  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    cccd: '',
    dateofbirth: '',
    fullname: '',
    phonenumber: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  // Fetch thông tin người dùng
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!accessToken) {
        console.error('Access Token is missing');
        setError('Access Token is missing.');
        setIsLoading(false);
        return;
      }
   
      try {
        const response = await axiosInstance.post(`http://localhost:3001/users/profile`, { username });
        // Sử dụng response.data thay vì response.json()
        if (response.data) {
          setUserInfo({
            ...response.data,
            dateofbirth: new Date(response.data.dateofbirth).toISOString().split('T')[0],  // Đảm bảo định dạng ngày đúng
          });
        } else {
          throw new Error('Invalid data format');
        }
   
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user info:', error);
        setError('Failed to fetch user info.');
        setIsLoading(false);
      }
    };
   
    fetchUserInfo();
   }, [accessToken, username]);

  // Xử lý thay đổi trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Lưu thông tin người dùng
  const handleSave = async () => {
    try {
      const response = await axiosInstance.post(`http://localhost:3001/users/edit`, userInfo);
      if (response.data) {
        setUserInfo(response.data); 
        setIsEditing(false);
        // Sau khi cập nhật thành công, reload trang để cập nhật lại thông tin
        window.location.reload();  // Tự động làm mới trang
      } else {
        throw new Error('Failed to save user info');
      }
    } catch (error) {
      console.error('Error saving user info:', error);
      setError('Failed to save user info.');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div><Header />
      <div className="app-container">
        <main className="main-content">
          <div className="profile-container">
            <div className="profile-left">
              <h1>Trang cá nhân</h1>
              <div className="avatar-placeholder">
                <span>👤</span>
              </div>
              {!isEditing && (
                <Button primary className="edit-profile-btn" onClick={() => setIsEditing(true)}>
                  Chỉnh sửa trang cá nhân
                </Button>
              )}
            </div>
            <div className="profile-right0">
              <h1>Thông tin chi tiết</h1>
              {isLoading ? (
                <p>Đang tải thông tin...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <div className="profile-right">
                  {isEditing ? (
                    <div>
                      <label htmlFor="fullname">Họ và tên:</label>
                      <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        value={userInfo.fullname}
                        onChange={handleChange}
                      />
                      <label htmlFor="cccd">CCCD:</label>
                      <input
                        type="text"
                        id="cccd"
                        name="cccd"
                        value={userInfo.cccd}
                        onChange={handleChange}
                        disabled
                        style={{
                          backgroundColor: '#f0f0f0', 
                        }}
                      />
                      <label htmlFor="dateofbirth">Ngày sinh:</label>
                      <input
                        type="date"
                        id="dateofbirth"
                        name="dateofbirth"
                        value={userInfo.dateofbirth}
                        onChange={handleChange}
                      />

                      <label htmlFor="phonenumber">Số điện thoại:</label>
                      <input
                        type="text"
                        id="phonenumber"
                        name="phonenumber"
                        value={userInfo.phonenumber}
                        onChange={handleChange}
                      />
                      <div className="ButtonGroup">
                        <Button outline className="cancel-profile-btn" onClick={handleCancel}>
                          Quay lại
                        </Button>
                        <Button primary className="save-profile-btn" onClick={handleSave}>
                          Lưu thông tin
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h2>{userInfo.fullname}</h2>
                      <p><b>CCCD:</b> {userInfo.cccd}</p>
                      <p><b>Số điện thoại:</b> {userInfo.phonenumber}</p>
                      <p><b>Ngày sinh:</b> {new Date(userInfo.dateofbirth).toLocaleDateString('vi-VN')}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InfoAccountPage;
