import EmojiPicker from "emoji-picker-react";
import FileSaver from "file-saver";
import ImagePicker from "../components/ImagePicker";
import Preferences from "./Preferences";
import About from "./About";
import React, { memo, useId, useState } from "react";
import WebCamera from "../components/WebCamera";
import { signOut } from 'firebase/auth';
import auth, { sendImage } from "../services/Firebase";
import useAuth from "../hooks/useAuth";
import { isAudio } from "../utility/AudioUtility";
import { useMessages } from "../hooks/useMessages";
import ReactTooltip from "react-tooltip";

const Features = ({
  messageBoxRef,
  fontSize,
  setFontSize,
  showSender,
  setShowSender,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imagePickerId = useId();
  const { user } = useAuth();
  const messages = useMessages();

  const handleSaveChat = () => {
    var blob = new Blob(
      [
        messages
          .map((m) =>
            isAudio(m.text)
              ? `(${m.timestamp}) ${m.displayName} sent an audio`
              : `(${m.timestamp}) ${m.displayName}: ${m.text}`
          )
          .join("\r\n"),
      ],
      {
        type: "text/plain;charset=utf-8",
      }
    );
    FileSaver.saveAs(blob, "chat-with-me.txt");
  };

  const onEmojiClick = (_event, emojiObject) => {
    const messageField = messageBoxRef.current;
    if (messageField) {
      messageField.value += emojiObject.emoji;
    }
    setShowPicker(false);
  };

  const emojiPickerStyle = {
    position: "absolute",
    top: "25%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "99",
    textAlign: "initial",
  };

  const handleGeoLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      const messageField = messageBoxRef.current;
      const paragraph = "<p>This is where I am right now!</p>";
      messageField.value = `${paragraph}http://www.google.com/maps/place/${lat},${long}`;
    });
  };

  return (
    <div className="text-right features navbar-toggleable-md navbar-light">
      {showPicker && (
        <EmojiPicker
          pickerStyle={emojiPickerStyle}
          onEmojiClick={onEmojiClick}
        />
      )}

      <WebCamera
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        callback={(selfie) => sendImage(user, selfie)}
      />

      <ImagePicker
        tag={imagePickerId}
        callback={(image) => sendImage(user, image)}
      />

      <button
        className="btn btn-outline brown"
        onClick={() => handleGeoLocation()}
        data-tip
        data-for="location"
      >
        <i className="fa fa-map-marker"></i>
      </button>

      <button
        className="btn btn-outline black"
        onClick={() => setIsModalOpen(true)}
        data-tip
        data-for="selfie"
      >
        <i className="fa fa-camera"></i>
      </button>

      <button
        className="btn btn-outline blue image-picker-button"
        data-tip
        data-for="picture"
      >
        <label className="image-picker-label" htmlFor={imagePickerId}>
          <i className="fa fa-image"></i>
        </label>
      </button>

      <button
        className="btn btn-outline green"
        onClick={() => setShowPicker((val) => !val)}
        data-tip
        data-for="emoji"
      >
        <i className="fa fa-smile-o"></i>
      </button>

      <Preferences
        fontSize={fontSize}
        setFontSize={setFontSize}
        showSender={showSender}
        setShowSender={setShowSender}
      />

      <button
        className="btn btn-outline yellow"
        onClick={(_e) => handleSaveChat()}
        data-tip
        data-for="chat"
      >
        <i className="fa fa-file-text-o"></i>
      </button>

      <About />

      <button
        className="btn btn-outline gray"
        onClick={(_e) => signOut(auth)}
        style={{ border: "none" }}
        data-tip
        data-for="out"
      >
        <i className="fa fa-sign-out"></i>
      </button>

      <ReactTooltip id="location" place="bottom" effect="solid">
        Send Location
      </ReactTooltip>
      <ReactTooltip id="selfie" place="bottom" effect="solid">
        Take Selfie
      </ReactTooltip>
      <ReactTooltip id="picture" place="bottom" effect="solid">
        Send Picture
      </ReactTooltip>
      <ReactTooltip id="emoji" place="bottom" effect="solid">
        Send Emoji
      </ReactTooltip>
      <ReactTooltip id="chat" place="bottom" effect="solid">
        Save Chat
      </ReactTooltip>
      <ReactTooltip id="out" place="bottom" effect="solid">
        Sign Out
      </ReactTooltip>
    </div>
  );
};

export default memo(Features);
