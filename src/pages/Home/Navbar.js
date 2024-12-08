import React from "react";
import "./Navbar.css";
import icon0 from "../../assets/HomePage/Navbar/navbar0.png";
import icon1 from "../../assets/HomePage/Navbar/navbar1.png";
import icon2 from "../../assets/HomePage/Navbar/navbar2.png";
import icon3 from "../../assets/HomePage/Navbar/navbar3.png";
import icon4 from "../../assets/HomePage/Navbar/navbar4.png";

function Navbar() {
  const navItems = [
    { name: "Danh mục", icon: icon0 },
    { name: "Đồ điện tử", icon: icon1 },
    { name: "Mỹ phẩm", icon: icon2 },
    { name: "Quần áo", icon: icon3 },
    { name: "Đồ gia dụng", icon: icon4 },
  ];

  return (
    <div className="navbar">
      <div className="navbar-container">
        {navItems.map((item, index) => (
          <div className="navbar-item" key={index}>
            <img src={item.icon} alt={item.name} className="navbar-icon" />
            <span className="navbar-text">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
