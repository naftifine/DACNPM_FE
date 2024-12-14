// import { HeaderOnly } from "./../components/Layout";
import { HomePage } from "./../pages/Home";
import { LoginPage } from "./../pages/Login";
import { SignupPage } from "./../pages/Signup";
import SearchProduct from "./../pages/SearchProduct";
import ProductDetail from "./../pages/ProductDetail"; // Import trang chi tiết sản phẩm
import Order from "./../pages/Order"; // Import trang đặt hàng
import ProductUpload from "./../pages/ProductUpload"; // Import trang đăng sản phẩm
import ChatBox from "./../pages/ChatBox"; // Import trang chat
import { InfoAccountPage } from "./../pages/InfoAccount"; // Import trang chat
import { AccessNewsPage } from "./../pages/AccessNews";
import  OrderListPage from "./../pages/OrderList";
const publicRoutes = [
    { path: "/", component: HomePage },
    { path: "/login", component: LoginPage },
    { path: "/signup", component: SignupPage },
    { path: "/search", component: SearchProduct },
    { path: "/product/:id", component: ProductDetail }, // Route chi tiết sản phẩm
    { path: "/order/:id", component: Order }, // Route đặt hàng
    { path: "/upload-product", component: ProductUpload }, // Route đặt hàng
    { path: "/chat", component: ChatBox }, // Route chat
    { path: "/info", component: InfoAccountPage },
    { path: "/accessnewspage", component: AccessNewsPage },
    { path: "/orderlist", component: OrderListPage},
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
