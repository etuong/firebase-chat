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

const Typing = ({ typist }) => {
  return (
    <div className="typing">
      <span className="typist">{typist} is typing</span>
      <TypingAnimation />
    </div>
  );
};

export default memo(Typing);
