import React, { useEffect, useState } from "react";
import "./styles.css";
import Notification from "../../assets/notification.svg";
import Message from "../../assets/message.svg";
import Settings from "../../assets/settings.svg";

const Navbar = ({ socket }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on("getNotification", ({ sender, type }) => {
      setNotifications((prev) => [...prev, { sender, type }]);
    });
  }, [socket]);

  const getNotificationMessage = (sender, type) => {
    let action = "";
    switch (type) {
      case 1:
        action = "liked";
        break;
      case 2:
        action = "commented";
        break;
      case 3:
        action = "shared";
        break;
      default:
        return;
    }
    return `${sender} ${action} your post`;
  };

  const handleClear = () => {
    setNotifications([]);
  };

  return (
    <div className="navbar">
      <span className="logo">aveSOME App</span>
      <div className="icons">
        <div className="icon">
          <img src={Notification} className="iconImg" alt="Notification" />
          {notifications.length > 0 && <div className="counter">{notifications.length}</div>}
        </div>
        <div className="icon">
          <img src={Message} className="iconImg" alt="Message" />
        </div>
        <div className="icon">
          <img src={Settings} className="iconImg" alt="Settings" />
        </div>
      </div>
      {notifications.length > 0 && (
        <div className="notifications">
          {notifications.map(({ sender, type }) => (
            <div className="notification">{getNotificationMessage(sender, type)}</div>
          ))}
          <button className="clearBtn" onClick={handleClear}>
            Mark as read
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
