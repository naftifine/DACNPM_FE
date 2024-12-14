import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import styles from "./BuyerOrders.module.css";

const BuyerOrders = () => {
    const [orders, setOrders] = useState([]); // State to hold orders
    const [error, setError] = useState(null); // State to hold any errors

    useEffect(() => {
        const fetchOrders = async () => {
            const userid = localStorage.getItem("userid"); // Assuming userid is stored in localStorage

            if (!userid) {
                setError("User ID is missing.");
                return;
            }

            try {
                const response = await axiosInstance.post("http://localhost:3001/orders/getByUserId", { userid });

                if (response.data && response.data.success) {
                    setOrders(response.data.orders); // Set the orders to the state
                } else {
                    setError(response.data.message || "Failed to fetch orders.");
                }
            } catch (error) {
                console.error("Error fetching orders:", error.message);
                setError("An error occurred while fetching orders.");
            }
        };

        fetchOrders();
    }, []);

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    if (!orders.length) {
        return <div className={styles.noOrders}>No orders found for this user.</div>;
    }

    return (
        <div className={styles.ordersContainer}>
            <h1>Your Orders</h1>
            <div className={styles.ordersList}>
                {orders.map((order) => (
                    <div key={order.id} className={styles.orderCard}>
                        <h2>Order ID: {order.id}</h2>
                        <p>Product: {order.productTitle}</p>
                        <p>Quantity: {order.quantity}</p>
                        <p>Total Price: {order.totalPrice.toLocaleString()}đ</p>
                        <p>Shipping Fee: {order.shippingFee.toLocaleString()}đ</p>
                        <p>Shipping Address: {order.shippingAddress.province}, {order.shippingAddress.street}</p>
                        <p>Buyer Note: {order.buyerNote}</p>
                        <p>Seller: {order.sellerName}</p>
                        <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BuyerOrders;
