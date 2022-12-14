import React, { memo } from "react";

const renderImageMessage = (text) => {
  return (
    <a target="_blank" href={text} rel="noreferrer">
      <img
        src={text}
        alt=""
        className="message-photo"
      />
    </a>
  );
};

const cleanseMessage = (text) => {
  return text
    .replace(/(https?:\/\/)([^ ]+)/g, '<a target="_blank" href="$&">$2</a>')
    .replaceAll("\n", "<br/>");
};

const Message = ({ text, fontSize, isImageLink }) => {
  return (
    <>
      {isImageLink ? (
        renderImageMessage(text)
      ) : (
        <span
          className="message-text"
          style={{ fontSize: `${fontSize}` }}
          dangerouslySetInnerHTML={{
            __html: cleanseMessage(text),
          }}
        ></span>
      )}
    </>
  );
};

export default memo(Message);
