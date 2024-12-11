import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faCircleXmark, faMagnifyingGlass, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import styles from "./Header.module.css";
import Button from "./../../../Button";
import images from "./../../../../assets/images";
import { useAuth } from "./../../../../context/AuthContext";
import { faComment, faFileLines } from "@fortawesome/free-regular-svg-icons";

const cx = classNames.bind(styles);

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchValue, setSearchValue] = useState(""); // Trạng thái lưu nội dung tìm kiếm
    const [searchResults, setSearchResults] = useState([]); // Kết quả tìm kiếm (nếu có)

    const { isLoggedIn, logout } = useAuth(); // Sử dụng AuthContext để lấy trạng thái đăng nhập

    useEffect(() => {
        setSearchResults([]); // Xóa kết quả tìm kiếm sau khi trang được tải lại
    }, []);

    const handleLogoClick = () => {
        navigate("/"); // Chuyển hướng về trang chính
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value); // Cập nhật giá trị tìm kiếm
    };

    const handleSearch = () => {
        if (searchValue.trim() !== "") {
            console.log("Search Value:", searchValue); // Log giá trị tìm kiếm
        } else {
            console.log("Search is empty");
        }
    };

    const handleClearSearch = () => {
        setSearchValue(""); // Xóa nội dung tìm kiếm
        setSearchResults([]); // Xóa kết quả tìm kiếm
    };

    const handleNavigateToInfo = () => {
        navigate('/info');  // Điều hướng đến trang /info
    };

    const handleNavigateToUpload = () => {
        navigate('/upload-product');  // Điều hướng đến trang /upload-product
    }

    const handleLogout = () => {
        logout(); // Gọi hàm logout từ AuthContext
        navigate("/"); // Điều hướng về trang chính (nếu cần)
    };

    // Kiểm tra đường dẫn hiện tại
    const isLogin = location.pathname === "/login";
    const isSignup = location.pathname === "/signup";

    return (
        <header className={cx("wrapper")}>
            <div className={cx("inner")}>
                {/* Logo và Home button */}
                <div className={cx("home")}>
                    <button className={cx("logo")} onClick={handleLogoClick}>
                        <img src={images.logo} alt="logo" />
                    </button>
                    {(isLogin || isSignup) && <Button to="/" text>Home</Button>}
                </div>

                {/* Search bar */}
                {!isLogin && !isSignup && (
                    <div className={cx("search")}>
                        <button className={cx("search-btn")} onClick={handleSearch}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                        <input
                            placeholder="Search"
                            spellCheck="false"
                            value={searchValue}
                            onChange={handleSearchChange}
                        />
                        {searchValue && (
                            <button className={cx("clear-btn")} onClick={handleClearSearch}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                        )}
                    </div>
                )}

                {/* Actions */}
                <div className={cx("actions")}>
                    {!isLoggedIn ? (
                        // Hiển thị nút khi chưa đăng nhập
                        <>
                            {!isLogin && !isSignup && (
                                <>
                                    <Button outline to="/login">Login</Button>
                                    <Button primary to="/signup">Sign Up</Button>
                                </>
                            )}
                            {isLogin && <Button primary to="/signup">Sign Up</Button>}
                            {isSignup && <Button outline to="/login">Log in</Button>}
                        </>
                    ) : (
                        // Hiển thị icon khi đã đăng nhập
                        <>
                            <button className={cx("post-btn")} onClick={() => navigate('/accessnewspage')}>
                                <FontAwesomeIcon icon={faFileLines} />
                                <div className={cx("icon-tooltip")}>Post</div>
                            </button>
                            <button className={cx("chat-btn")} onClick={() => navigate('/chat')}>
                                <FontAwesomeIcon icon={faComment} />
                                <div className={cx("icon-tooltip")}>Chat</div>
                            </button>
                            <button className={cx("cart-btn")} onClick={handleNavigateToUpload}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                                <div className={cx("icon-tooltip")}>Upload</div>
                            </button>
                            <div className={cx("avatar-btn")}>
                                <img src={images.avatarDefault} alt="User Avatar" />
                                <div className={cx("avatar-dropdown")}>
                                    <Button onClick={handleNavigateToInfo}>Hồ sơ người dùng</Button>
                                    <Button onClick={handleLogout}>Đăng xuất</Button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
