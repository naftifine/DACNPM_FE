import React, { useState, useEffect } from 'react';
import './AccessNewsPage.css';
import Button from '../../components/Button';
import Header from '../../components/Layout/conponent/Header';

const AccessNewsPage = () => {
  const [items, setItems] = useState([]); // Items fetched from the backend
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [filter, setFilter] = useState('all'); // Current filter
  const [activeTab, setActiveTab] = useState('all'); // Active tab
  const [error, setError] = useState(null); // Error state

  const userid=localStorage.getItem("userid");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`http://localhost:3001/products/getProductByUserId?userid=${userid}`);
        const data = await response.json();
        if (data.success) {
          setItems(data.data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Lỗi kết nối với server!');
      } finally {
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
    : items.filter(item => item.approved === filter);

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
              className={activeTab === 'pending' ? 'rejected' : ''}
              onClick={() => handleTabClick('pending')}
            >
              Chờ duyệt
            </Button>
            <Button
              className={activeTab === 'accepted' ? 'rejected' : ''}
              onClick={() => handleTabClick('accepted')}
            >
              Đã duyệt
            </Button>
            <Button
              className={activeTab === 'rejected' ? 'accepted' : ''}
              onClick={() => handleTabClick('rejected')}
            >
              Bị từ chối
            </Button>
          </div>
          <div>
            {isLoading ? (
              <p>Đang tải dữ liệu...</p>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <div key={item.id} className="item-card">
                  <img src={item.image} alt={item.name} />
                  <div className="item-info">
                    
                  <a href={`/product/${item.productid}`}>
                    <h3>{item.name}</h3>
                    </a>
                    <p>{item.price.toLocaleString()} VNĐ</p>
                    <p className={`approved ${item.approved}`}>
                      {item.approved === 'pending' ? 'Chờ duyệt' : item.approved === 'accepted' ? 'Đã duyệt' : 'Bị từ chối'}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>Không có tin nào phù hợp.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AccessNewsPage;
