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

  const navItems = [
    { name: "Danh mục", icon: icon0 },
    { name: "Đồ điện tử", icon: icon1 },
    { name: "Mỹ phẩm", icon: icon2 },
    { name: "Quần áo", icon: icon3 },
    { name: "Đồ gia dụng", icon: icon4 },
  ];

  // Toggle dropdown khi nhấn vào "Danh mục"
  const toggleDropdown = () => {
    console.log("Toggling dropdown"); // Log để kiểm tra sự kiện click
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        {navItems.map((item, index) => (
          <div className="navbar-item" key={index}>
            {/* Khi là "Danh mục", render dropdown */}
            {item.name === "Danh mục" ? (
              <div className="navbar-item dropdown" onClick={toggleDropdown}>
                <img src={item.icon} alt={item.name} className="navbar-icon" />
                <span className="navbar-text">{item.name}</span>
                {isDropdownOpen && (
                  <div className="dropdown-content">
                    <Category /> 
                  </div>
                )}
              </div>
            ) : (
              <div className="navbar-item">
                <img src={item.icon} alt={item.name} className="navbar-icon" />
                <span className="navbar-text">{item.name}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
