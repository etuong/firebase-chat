import React, { memo } from "react";

const MyMessage = (props) => {
  const { dateTime, displayName } = props.message;

  return (
    <div className="message-data justify-right">
      <span className="message-data-time">{dateTime}</span>
      <span className="message-data-sender-name">{displayName}</span>
    </div>
  );
};

export default memo(MyMessage);
