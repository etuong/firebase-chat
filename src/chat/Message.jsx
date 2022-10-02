import React, { memo } from "react";
import { getTransformedImage, isImageLink } from "utility/ImageUtility";

const renderImageMessage = (text) => {
  return (
    <React.Fragment>
      {text.includes("cloudinary") ? (
        <a target="_blank" href={text} rel="noreferrer">
          <img src={getTransformedImage(text)} alt="" />
        </a>
      ) : (
        <a target="_blank" href={text} rel="noreferrer">
          <img src={text} alt="" width="200" />
        </a>
      )}
    </React.Fragment>
  );
};

const cleanseMessage = (text) => {
  return text
    .replace(/(https?:\/\/)([^ ]+)/g, '<a target="_blank" href="$&">$2</a>')
    .replaceAll("\n", "<br/>");
};

const Message = ({ text, mine, showSender, fontSize }) => {
  return (
    <React.Fragment>
      {isImageLink(text) ? (
        renderImageMessage(text)
      ) : (
        <div
          className={`message ${mine ? "my-message" : "other-message"} ${
            showSender ? "" : "no-bubble"
          }`}
          style={{ fontSize: `${fontSize}` }}
          dangerouslySetInnerHTML={{
            __html: cleanseMessage(text),
          }}
        ></div>
      )}
    </React.Fragment>
  );
};

export default memo(Message);
