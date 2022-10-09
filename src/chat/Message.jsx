import React, { memo } from "react";
import { isImageLink } from "../utility/ImageUtility";

const renderImageMessage = (text, fromMe) => {
  return (
    <a target="_blank" href={text} rel="noreferrer">
      <img
        src={text}
        alt=""
        className={["message-photo", fromMe && "my-message-photo"].join(" ")}
      />
    </a>
  );
};

const cleanseMessage = (text) => {
  return text
    .replace(/(https?:\/\/)([^ ]+)/g, '<a target="_blank" href="$&">$2</a>')
    .replaceAll("\n", "<br/>");
};

const Message = ({ text, fromMe, fontSize }) => {
  return (
    <div className="chat-message">
      {isImageLink(text) ? (
        renderImageMessage(text, fromMe)
      ) : (
        <span
          className={["message-text", fromMe && "my-message-text"].join(" ")}
          style={{ fontSize: `${fontSize}` }}
          dangerouslySetInnerHTML={{
            __html: cleanseMessage(text),
          }}
        ></span>
      )}
      <span className="menu-options">
        <i class="arrow down"></i>
      </span>
    </div>
  );
};

export default memo(Message);
