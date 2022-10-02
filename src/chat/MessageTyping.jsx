import React, { memo } from "react";

const TypingAnimation = () => {
  return (
    <div className="dots-container">
      <span id="dot1"></span>
      <span id="dot2"></span>
      <span id="dot3"></span>
    </div>
  );
};

const MessageTyping = ({ typist }) => {
  return (
    <div className="message-item">
      <div
        className="message-avatar"
        style={{
          backgroundImage: `url(${typist?.profilePic})`,
        }}
      ></div>
      <TypingAnimation />
    </div>
  );
};

export default memo(MessageTyping);
