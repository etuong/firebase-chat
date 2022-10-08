import React, { memo } from "react";

const YourMessage = (props) => {
  const { dateTime, displayName } = props.message;

  return (
    <div className="message-data">
      <span className="message-data-sender-name">{displayName}</span>
      <span className="message-data-time">{dateTime}</span>
    </div>
  );
};

export default memo(YourMessage);
