import Features from "./Features";
import Header from "./Header";
import Messages from "./Messages";
import React, { useRef, useState } from "react";
import SendBox from "./SendBox";
import Typing from "../components/Typing";

const ChatRoom = () => {
  const messageBoxRef = useRef();
  const [fontSize, setFontSize] = useState("16px");
  const [showSender, setShowSender] = useState(true);

  return (
    <div className="chat-app">
      <div className="header">
        <Header />
        <Features
          messageBoxRef={messageBoxRef}
          fontSize={fontSize}
          setFontSize={setFontSize}
          showSender={showSender}
          setShowSender={() => setShowSender((showSender) => !showSender)}
        />
      </div>
      <Messages fontSize={fontSize} showSender={showSender} />
      <Typing typist={"Ethan Uong"} />
      <SendBox messageBoxRef={messageBoxRef} />
    </div>
  );
};

export default ChatRoom;
