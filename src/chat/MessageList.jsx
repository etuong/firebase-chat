import React from "react";
import useAuth from "../hooks/useAuth";
import { useMessages } from "../hooks/useMessages";
import Message from "./Message";
import MyMessage from "./MyMessage";
import YourMessage from "./YourMessage";

const renderMessage = (user, message, index, fontSize) => {
  const { uid, text } = message;
  const fromMe = uid === user.uid;

  return (
    <li key={index} className={`clearfix ${fromMe ? "flush-right" : ""}`}>
      {message.isAudio ? (
        <audio controls>
          <source src={text} type="audio/mp3" />
          <source src={text} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      ) : (
        <Message isMine={fromMe} text={text} fontSize={fontSize} />
      )}

      {fromMe ? (
        <MyMessage message={message} />
      ) : (
        <YourMessage message={message} />
      )}
    </li>
  );
};

const MessageList = ({ fontSize }) => {
  const { user } = useAuth();
  const messages = useMessages();

  return (
    <div>
      {messages.map((message, index) =>
        renderMessage(user, message, index, fontSize)
      )}
    </div>
  );
};

export default MessageList;
