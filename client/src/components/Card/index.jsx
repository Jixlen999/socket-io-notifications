import React, { useState } from "react";
import "./styles.css";
import Heart from "../../assets/heart.svg";
import Comment from "../../assets/comment.svg";
import Info from "../../assets/info.svg";
import Share from "../../assets/share.svg";
import HeartFilled from "../../assets/heartFilled.svg";

const Card = ({ post, socket, user }) => {
  const [liked, setLiked] = useState(false);

  const handleAction = (type) => () => {
    if (type === 1) {
      setLiked(true);
    }
    socket.emit("sendNotification", { sender: user, receiver: post.username, type });
  };

  return (
    <div className="card">
      <div className="info">
        <img src={post.userImg} className="userImg" alt="user" />
        <span>{post.fullname}</span>
      </div>
      <img src={post.postImg} className="postImg" alt="post" />
      <div className="interaction">
        {liked ? (
          <img src={HeartFilled} alt="heart" className="cardIcon" />
        ) : (
          <img src={Heart} alt="heart" className="cardIcon" onClick={handleAction(1)} />
        )}
        <img src={Comment} alt="heart" className="cardIcon" onClick={handleAction(2)} />
        <img src={Share} alt="share" className="cardIcon" onClick={handleAction(3)} />
        <img src={Info} alt="info" className="cardIcon infoIcon" />
      </div>
    </div>
  );
};

export default Card;
