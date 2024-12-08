import React, { useState, useEffect } from 'react';
import './InfoAccountPage.css';
import Button from '../../components/Button';
import Header from '../../components/Layout/conponent/Header';

const InfoAccountPage = () => {
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

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const userID = localStorage.getItem('UserID');
  const username = localStorage.getItem('Username');


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
        const response = await fetch('https://674b14b171933a4e8854567d.mockapi.io/signup/' + userID, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('API request failed');
        }

        const data = await response.json();
        if (typeof data === 'object' && !Array.isArray(data)) {
          setUserInfo(data);
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
  }, [accessToken]);

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
      const response = await fetch('https://674b14b171933a4e8854567d.mockapi.io/signup/' + userID, {
        method: 'PUT',
        body: JSON.stringify(userInfo),
      });

      if (!response.ok) {
        throw new Error('Failed to save user info');
      }

      const updatedUserInfo = await response.json();
      setUserInfo(updatedUserInfo);
      setIsEditing(false);
      console.log('User info saved:', updatedUserInfo);
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
