import Features from "./Features";
import Header from "./Header";
import Messages from "./Messages";
import React, { useRef, useState } from "react";
import SendBox from "./SendBox";
import Typing from "../components/Typing";
import { useTypists } from "../hooks/useTypists";

const ChatRoom = () => {
  const messageBoxRef = useRef();
  const [fontSize, setFontSize] = useState("16px");
  const [showSender, setShowSender] = useState(true);
  const typists = useTypists();

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
      {typists?.map((typist, index) => (
        <Typing key={index} typist={typist.displayName} />
      ))}
      <SendBox messageBoxRef={messageBoxRef} />
    </div>
  );
};

export default ChatRoom;
