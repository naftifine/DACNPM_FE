import React, { createContext, useState, useContext, useEffect } from "react";

// Tạo Context
const AuthContext = createContext();

// Provider để bọc ứng dụng
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Kiểm tra trạng thái đăng nhập từ localStorage khi ứng dụng khởi động
    useEffect(() => {
        const storedLoggedInStatus = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(storedLoggedInStatus);
    }, []);

    const login = () => {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true"); // Lưu trạng thái vào localStorage
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.setItem("isLoggedIn", "false"); // Xóa trạng thái trong localStorage
        localStorage.removeItem("accessToken"); // Xóa thông tin đăng nhập khác nếu có
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("UserID");
        localStorage.removeItem("Username");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook để truy cập vào Context
export const useAuth = () => {
    return useContext(AuthContext);
};
