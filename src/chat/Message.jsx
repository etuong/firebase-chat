import React, { memo } from "react";
import { getTransformedImage, isImageLink } from "../utility/ImageUtility";

const renderImageMessage = (text) => {
  return (
    <a target="_blank" href={text} rel="noreferrer">
      <img src={text} alt="" width="200" />
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
    <React.Fragment>
      {isImageLink(text) ? (
        renderImageMessage(text)
      ) : (
        <span
          className={["message", fromMe && "my-message"].join(" ")}
          style={{ fontSize: `${fontSize}` }}
          dangerouslySetInnerHTML={{
            __html: cleanseMessage(text),
          }}
        ></span>
      )}
    </React.Fragment>
  );
};

export default memo(Message);
