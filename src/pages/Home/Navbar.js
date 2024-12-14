import React, { useState } from "react";
import "./Navbar.css";
import icon0 from "../../assets/HomePage/Navbar/navbar0.png";
import icon1 from "../../assets/HomePage/Navbar/navbar1.png";
import icon2 from "../../assets/HomePage/Navbar/navbar2.png";
import icon3 from "../../assets/HomePage/Navbar/navbar3.png";
import icon4 from "../../assets/HomePage/Navbar/navbar4.png";
import Category from "../../components/Layout/conponent/Category"; // Import Category component để hiển thị danh mục

function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false); // State để điều khiển dropdown

  // Toggle dropdown khi nhấn vào "Danh mục"
  const toggleDropdown = () => {
    console.log("Toggling dropdown"); // Log để kiểm tra sự kiện click
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        {/* Danh mục */}
        <div className="navbar-item dropdown" onClick={toggleDropdown}>
          <img src={icon0} alt="Danh mục" className="navbar-icon" />
          <span className="navbar-text">Danh mục</span>
          {isDropdownOpen && (
            <div className="dropdown-content">
              <Category />
            </div>
          )}
        </div>

        {/* Đồ điện tử */}
          <a href={`/search?categoryid=${1}&categoryname=${"Điện tử"}`} className="navbar-item">
            <img src={icon1} alt="Điện tử" className="navbar-icon" />
            <span className="navbar-text">Điện tử</span>
          </a>

        {/* Mỹ phẩm */}
        <a href={`/search?categoryid=${2}&categoryname=${"Thời trang và Mỹ phẩm"}`} className="navbar-item">
          <img src={icon2} alt="Thời trang và Mỹ phẩm" className="navbar-icon" />
          <span className="navbar-text">Thời trang và Mỹ phẩm</span>
        </a>

        {/* Sách */}
        <a href={`/search?categoryid=${7}&categoryname=${"Sách và văn phòng phẩm"}`} className="navbar-item">
          <img src={icon3} alt="Sách và văn phòng phẩm" className="navbar-icon" />
          <span className="navbar-text">Sách và văn phòng phẩm</span>
          </a>

        {/* Đồ gia dụng */}
          <a href={`/search?categoryid=${3}&categoryname=${"Đồ gia dụng"}`} className="navbar-item">
          <img src={icon4} alt="Đồ gia dụng" className="navbar-icon" />
          <span className="navbar-text">Đồ gia dụng</span>
          </a>
      </div>
    </div>
  );
}

export default Navbar;


