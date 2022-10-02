import React, { memo } from "react";

const MyMessage = (props) => {
  return (
    <div className="message-data justify-right">
      <span className="message-data-time">{props.message.dateTime}</span>
      <span className="message-data-sender-name">
        {props.message.senderName}
      </span>
      <div
        className="sender"
        style={{
          backgroundImage: `url(${props.message.senderPic})`,
        }}
      ></div>
    </div>
  );
};

export default memo(MyMessage);
