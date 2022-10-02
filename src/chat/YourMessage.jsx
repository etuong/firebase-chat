import React, { memo } from "react";

const YourMessage = (props) => {
  return (
    <div className="message-data">
      <div
        className="sender"
        style={{
          backgroundImage: `url(${props.message.senderPic})`,
        }}
      ></div>
      <span className="message-data-sender-name">
        {props.message.senderName}
      </span>
      <span className="message-data-time">{props.message.dateTime}</span>
    </div>
  );
};

export default memo(YourMessage);
