import Features from "./Features";
import Header from "./Header";
import Messages from "./Messages";
import React, { useRef, useState } from "react";
import SendBox from "./SendBox";

const ChatRoom = () => {
  const messageBoxRef = useRef();
  const [fontSize, setFontSize] = useState("16px");
  const [showSender, setShowSender] = useState(true);

  return (
    <div className="chat-app">
      <section className="header">
        <Header />
        <Features
          messageBoxRef={messageBoxRef}
          fontSize={fontSize}
          setFontSize={setFontSize}
          showSender={showSender}
          setShowSender={() => setShowSender((showSender) => !showSender)}
        />
      </section>
      <Messages fontSize={fontSize} showSender={showSender} />
      <SendBox messageBoxRef={messageBoxRef} />
    </div>
  );
};

export default ChatRoom;
