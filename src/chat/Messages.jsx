import Message from "./Message";
import React, { useRef, useLayoutEffect, useEffect } from "react";
import Typing from "../components/Typing";
import useAuth from "../hooks/useAuth";
import { deleteMessage } from "../services/Firebase";
import { isAudio } from "../utility/AudioUtility";
import { isImageLink } from "../utility/ImageUtility";
import { useMessages } from "../hooks/useMessages";
import { useTypists } from "../hooks/useTypists";

const Messages = ({ fontSize, showSender }) => {
  const chatBoxRef = useRef();
  const { user } = useAuth();
  const messages = useMessages();
  const typists = useTypists();

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scroll({
        top: chatBoxRef.current.scrollHeight + 100,
        behavior: "smooth",
      });
    }
  }, []);

  useLayoutEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  });

  return (
    <section className="chat-box m-b-0" ref={chatBoxRef}>
      {messages.map((message, index) => {
        const { id, uid, text, displayName, timestamp } = message;
        let audioSource = undefined;
        let isImage = false;
        const fromMe = uid === user.uid;

        if (isAudio(text)) {
          audioSource = text.split(";");
          audioSource[0] = "data:audio/mp3;";
          audioSource = audioSource[0] + audioSource[1];
        } else if (isImageLink(text)) {
          isImage = true;
        }

        return (
          <div
            key={index}
            className={`chat-message-wrapper ${fromMe ? "own-message" : ""}`}
          >
            <div
              className={`chat-message ${
                audioSource || isImage ? "negate-pseudo" : ""
              }`}
            >
              {audioSource ? (
                <audio controls>
                  <source src={audioSource} type="audio/mp3" />
                  <source src={audioSource} type="audio/wav" />
                  Your browser does not support the audio element.
                </audio>
              ) : (
                <Message
                  text={text}
                  fontSize={fontSize}
                  isImageLink={isImage}
                />
              )}
              {fromMe && (
                <span
                  className="menu-options"
                  onClick={() => deleteMessage(id)}
                >
                  <i className="fa fa-times fa-lg delete"></i>
                </span>
              )}
            </div>

            {showSender && (
              <span className="message-data">
                <span className="message-data-sender-name">{displayName}</span>
                <span className="message-data-time">{timestamp}</span>
              </span>
            )}
          </div>
        );
      })}
      <div className="typing-container">
        {typists?.map((typist, index) => (
          <Typing key={index} typist={typist.displayName} />
        ))}
      </div>
    </section>
  );
};

export default Messages;
