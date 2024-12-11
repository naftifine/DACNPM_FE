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
    Username: '',
    Passw: '',
    CCCD: '',
    DateOfBirth: '',
    Fullname: '',
    PhoneNumber: '',
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
        console.log("get", accessToken);
        
        // Sử dụng response.data thay vì response.json()
        if (response.data) {
          setUserInfo(response.data); // Gán dữ liệu người dùng vào state
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
      const response = await fetch(`http://localhost:3001/users/profile/`, {
        method: 'PUT', // Sử dụng PUT hoặc PATCH cho việc cập nhật thông tin người dùng
        headers: {
          "Authorization": `Bearer ${accessToken}`,  // Gửi token trong header Authorization
          "Content-Type": "application/json",  // Nội dung yêu cầu là JSON
        },
        body: JSON.stringify(userInfo),  // Gửi toàn bộ dữ liệu người dùng đã chỉnh sửa (chuyển thành chuỗi JSON)
      });
  
      if (!response.ok) {
        throw new Error('Failed to save user info');
      }
  
      const updatedUserInfo = await response.json();  // Nhận dữ liệu đã được cập nhật từ server
      setUserInfo(updatedUserInfo);  // Cập nhật lại state userInfo
      setIsEditing(false);  // Đặt trạng thái chỉnh sửa thành false để ngừng chế độ chỉnh sửa
      console.log('User info saved:', updatedUserInfo);  // Log thông tin người dùng đã lưu
    } catch (error) {
      console.error('Error saving user info:', error);
      setError('Failed to save user info.');  // Hiển thị thông báo lỗi nếu có
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
                      <label htmlFor="Fullname">Họ và tên:</label>
                      <input
                        type="text"
                        id="Fullname"
                        name="Fullname"
                        value={userInfo.Fullname}
                        onChange={handleChange}
                      />
                      <label htmlFor="CCCD">CCCD:</label>
                      <input
                        type="text"
                        id="CCCD"
                        name="CCCD"
                        value={userInfo.CCCD}
                        onChange={handleChange}
                      />
                      <label htmlFor="DateOfBirth">Ngày sinh:</label>
                      <input
                        type="date"
                        id="DateOfBirth"
                        name="DateOfBirth"
                        value={userInfo.DateOfBirth}
                        onChange={handleChange}
                      />

                      <label htmlFor="PhoneNumber">Số điện thoại:</label>
                      <input
                        type="text"
                        id="PhoneNumber"
                        name="PhoneNumber"
                        value={userInfo.PhoneNumber}
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
                      <h2>{userInfo.Fullname}</h2>
                      <p><b>CCCD:</b> {userInfo.CCCD}</p>
                      <p><b>Số điện thoại:</b> {userInfo.PhoneNumber}</p>
                      <p><b>Ngày sinh:</b> {userInfo.DateOfBirth}</p>
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