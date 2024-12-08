import React, { useState } from "react";
import "./LoginPage.css";
import Button from "./../../components/Button";
import { useAuth } from "../../context/AuthContext"; // Import AuthContext
import Header from "../../components/Layout/conponent/Header";

const LoginPage = () => {
  const [Username, setUsername] = useState("");
  const [Passw, setPassw] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth(); // Lấy hàm login từ AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("https://674b14b171933a4e8854567d.mockapi.io/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Username, Passw }),
      });

      if (response.ok) {
        const data = await response.json();

        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("UserID", data.UserID);
        localStorage.setItem("Username", data.Username);

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
            <label htmlFor="Username">Tên đăng nhập</label>
            <input
              type="text"
              id="Username"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="Passw"
              value={Passw}
              onChange={(e) => setPassw(e.target.value)}
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
