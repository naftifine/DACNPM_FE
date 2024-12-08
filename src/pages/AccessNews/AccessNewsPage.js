import React, { useState, useEffect } from 'react';
import './AccessNewsPage.css';
import Button from '../../components/Button';
import Header from '../../components/Layout/conponent/Header';

const AccessNewsPage = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('https://674b14b171933a4e8854567d.mockapi.io/item'); // Đổi URL thành API thật
        const data = await response.json();
        setItems(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleTabClick = (filterType) => {
    setFilter(filterType);
    setActiveTab(filterType);
  };

  const filteredItems = filter === 'all'
    ? items
    : items.filter(item => item.status === filter);

  return (
    <div>
      <Header />
      <div className="accessNewsPage_container">
        <main>
          <div className="tab-label">Quản lý tin</div>
          <div className="tab-menu">
            <Button
              className={activeTab === 'all' ? 'active' : ''}
              onClick={() => handleTabClick('all')}
            >
              Tất cả
            </Button>
            <Button
              className={activeTab === 'pending' ? 'active' : ''}
              onClick={() => handleTabClick('pending')}
            >
              Chờ duyệt
            </Button>
            <Button
              className={activeTab === 'approved' ? 'active' : ''}
              onClick={() => handleTabClick('approved')}
            >
              Đã duyệt
            </Button>
            <Button
              className={activeTab === 'rejected' ? 'active' : ''}
              onClick={() => handleTabClick('rejected')}
            >
              Bị từ chối
            </Button>
          </div>
          <div>
            {isLoading ? (
              <p>Đang tải dữ liệu...</p>
            ) : (
              filteredItems.map(item => (
                <div key={item.id} className="item-card">
                  <img src={item.imageUrl} alt={item.name} />
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p>{item.price} VNĐ</p>
                    <p>{item.location}</p>
                    <p className={`status ${item.status}`}>
                      {item.status === 'pending' ? 'Chờ duyệt' : item.status === 'approved' ? 'Đã duyệt' : 'Bị từ chối'}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AccessNewsPage;
