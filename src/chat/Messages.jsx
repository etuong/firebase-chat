import React from "react";
import useAuth from "../hooks/useAuth";
import { useMessages } from "../hooks/useMessages";
import Message from "./Message";

const Messages = ({ fontSize }) => {
  const { user } = useAuth();
  const messages = useMessages();

  return (
    <>
      {messages.map((message, index) => {
        const { uid, text, displayName, timestamp } = message;
        const fromMe = uid === user.uid;
        let audioSource = undefined;

        if (text.includes("data:application/octet-stream;base64")) {
          audioSource = text.split(";");
          audioSource[0] = "data:audio/mp3;";
          audioSource = audioSource[0] + audioSource[1];
        }

        return (
          <div
            key={index}
            className={["chat-message", fromMe && "flush-right"].join(" ")}
          >
            {audioSource ? (
              <audio controls>
                <source src={audioSource} type="audio/mp3" />
                <source src={audioSource} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <Message text={text} fromMe={fromMe} fontSize={fontSize} />
            )}

            <span
              className={["message-data", fromMe && "justify-right"].join(" ")}
            >
              <span className="message-data-sender-name">{displayName}</span>
              <span className="message-data-time">{timestamp}</span>
            </span>
          </div>
        );
      })}
    </>
  );
};

export default Messages;
