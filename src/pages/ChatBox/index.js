import React, { useState, useEffect } from "react";
import styles from "./ChatBox.module.css";
import users from "../../mockData/users";
import messagesData from "../../mockData/messages";
import Header from "../../components/Layout/conponent/Header";

function ChatBox() {
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [messageList, setMessageList] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);

    // Giả lập API để tải tin nhắn khi chọn người dùng
    useEffect(() => {
        if (selectedUserId !== null) {
            const userMessages = messagesData[selectedUserId] || [];
            setMessageList(userMessages);
        }
    }, [selectedUserId]);

    // Hàm xử lý gửi tin nhắn
    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const updatedMessages = [
                ...messageList,
                { sender: "Bạn", text: newMessage, timestamp: new Date().toLocaleTimeString() },
            ];
            setMessageList(updatedMessages);
            setNewMessage("");
        }
    };

    // Hàm xử lý toggle bảng chức năng
    const toggleOptions = () => {
        setIsOptionsOpen((prev) => !prev);
    };

    return (
        <div>
            <Header />
            <div className={styles.chatContainer}>
                {/* Danh sách người dùng */}
                <div className={styles.userList}>
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className={`${styles.userItem} ${selectedUserId === user.id ? styles.selected : ""}`}
                            onClick={() => setSelectedUserId(user.id)}
                        >
                            {user.name}
                        </div>
                    ))}
                </div>

                {/* Khu vực chat */}
                <div className={styles.chatArea}>
                    {selectedUserId ? (
                        <>
                            {/* Header */}
                            <div className={styles.chatHeader}>
                                <h3>
                                    {users.find((user) => user.id === selectedUserId).name}
                                </h3>
                                <div className={styles.optionsWrapper}>
                                    <button
                                        className={styles.optionsButton}
                                        onClick={toggleOptions}
                                    >
                                        <h3>⋮</h3>
                                    </button>
                                    <div
                                        className={`${styles.optionsMenu} ${isOptionsOpen ? styles.active : ""
                                            }`}
                                    >
                                        <div className={styles.optionsItem}>Xem hồ sơ</div>
                                        <div className={styles.optionsItem}>Chặn người dùng</div>
                                        <div className={styles.optionsItem}>Ẩn hội thoại</div>
                                    </div>
                                </div>
                            </div>

                            {/* Nội dung chat */}
                            <div className={styles.chatContent}>
                                {messageList.map((message, index) => (
                                    <div key={index} className={styles.chatMessage}>
                                        <strong>{message.sender}:</strong> {message.text}{" "}
                                        <small>{message.timestamp}</small>
                                    </div>
                                ))}
                            </div>

                            {/* Input tin nhắn */}
                            <div className={styles.chatInput}>
                                <input
                                    type="text"
                                    placeholder="Nhập tin nhắn"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                />
                                <button
                                    className={styles.sendButton}
                                    onClick={handleSendMessage}
                                >
                                    ▶
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className={styles.noUserSelected}>
                            Hãy chọn một người dùng để bắt đầu chat!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChatBox;
