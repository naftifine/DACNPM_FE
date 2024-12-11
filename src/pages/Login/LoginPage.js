import React, { useState } from "react";
import "./LoginPage.css";
import Button from "./../../components/Button";
import { useAuth } from "../../context/AuthContext"; // Import AuthContext
import Header from "../../components/Layout/conponent/Header";
const LoginPage = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth(); // Lấy hàm login từ AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();

        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("useriD", data.user.useriD);
        localStorage.setItem("username", data.user.username);

        // Cập nhật trạng thái đăng nhập
        login();

        alert("Đăng nhập thành công!");
        window.location.href = "/";
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.msg || "Tên đăng nhập hoặc mật khẩu không đúng");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Đã xảy ra lỗi, vui lòng thử lại sau.");
    }

    setIsSubmitting(false);
  };


  return (
    <div><Header />
      
      <div className="login-page">
        <div className="login-container">
          <h1>Đăng nhập</h1>          
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Tên đăng nhập</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              required
            />
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
            />
            <Button primary type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
