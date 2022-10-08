import FileSaver from "file-saver";
import React, { useLayoutEffect, useRef, useState } from "react";
import { useMessages } from "../hooks/useMessages";
import { sendMessage } from "../services/Firebase";
import Features from "./Features";
import Header from "./Header";
import SendBox from "./SendBox";
import Messages from "./Messages";

const ChatRoom = () => {
  const chatBoxRef = useRef();
  const messageBoxRef = useRef();
  const [fontSize, setFontSize] = useState("16px");
  const messages = useMessages();

  useLayoutEffect(() => {
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
              ? `(${m.dateTime}) ${m.displayName} sent an audio`
              : `(${m.dateTime}) ${m.displayName}: ${m.text}`
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
      <div className="chat">
        <div className="header">
          <Header />
          <Features
            messageBoxRef={messageBoxRef}
            handleSaveChat={handleSaveChat}
            sendMessage={sendMessage}
            fontSize={fontSize}
            setFontSize={setFontSize}
          />
        </div>

        <div className="chat-box m-b-0" ref={chatBoxRef}>
          {<Messages fontSize={fontSize} />}
        </div>

        <SendBox messageBoxRef={messageBoxRef} />
      </div>
    </div>
  );
};

export default ChatRoom;
