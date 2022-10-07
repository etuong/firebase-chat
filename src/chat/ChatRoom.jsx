import FileSaver from "file-saver";
import React, { useRef, useState } from "react";
import { sendMessage } from "../services/Firebase";
import { useMessages } from "../hooks/useMessages";
import Header from "./Header";
import Features from "./Features";
import Message from "./Message";
import MyMessage from "./MyMessage";
import SendBox from "./SendBox";
import Welcome from "./Welcome";
import YourMessage from "./YourMessage";

const renderMessage = (message, index, showSender, fontSize) => {
  if (!message || !message.text) {
    return null;
  }

  return (
    <li
      key={index}
      className={`clearfix ${message.fromMe ? "flush-right" : ""}`}
    >
      {message.isAudio ? (
        <audio controls>
          <source src={message.text} type="audio/mp3" />
          <source src={message.text} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      ) : (
        <Message
          mine={message.fromMe}
          text={message.text}
          showSender={showSender}
          fontSize={fontSize}
        />
      )}
      {showSender && (
        <React.Fragment>
          {message.fromMe ? (
            <MyMessage message={message} />
          ) : (
            <YourMessage message={message} />
          )}
        </React.Fragment>
      )}
    </li>
  );
};

const ChatRoom = () => {
  const chatBoxRef = useRef();
  const messageBoxRef = useRef();
  const [showSender, setShowSender] = useState(true);
  const [fontSize, setFontSize] = useState("16px");
  const messages = undefined; //useMessages();

  React.useLayoutEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  });

  const handleSaveChat = () => {
    var blob = new Blob(
      [
        messages
          .map((m) =>
            m.isAudio
              ? `(${m.dateTime}) ${m.senderName} sent an audio`
              : `(${m.dateTime}) ${m.senderName}: ${m.text}`
          )
          .join("\r\n"),
      ],
      {
        type: "text/plain;charset=utf-8",
      }
    );
    FileSaver.saveAs(blob, "chat-with-me.txt");
  };

  return (
    <div className="chat-app">
      {/* <Welcome /> */}
      <div className="chat">
        <div className="header clearfix">
          {/* <Header /> */}
          <Features
            messageBoxRef={messageBoxRef}
            handleSaveChat={handleSaveChat}
            sendMessage={sendMessage}
            showSender={showSender}
            setShowSender={() => setShowSender((showSender) => !showSender)}
            fontSize={fontSize}
            setFontSize={setFontSize}
          />
        </div>

        <div className="chat-history" ref={chatBoxRef}>
          <ul className="m-b-0">
            {messages &&
              messages.map((message, index) =>
                renderMessage(message, index, showSender, fontSize)
              )}
          </ul>
        </div>

        <SendBox messageBoxRef={messageBoxRef} />
      </div>
    </div>
  );
};

export default ChatRoom;
