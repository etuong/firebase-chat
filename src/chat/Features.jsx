import EmojiPicker from "emoji-picker-react";
import FileSaver from "file-saver";
import ImagePicker from "./ImagePicker";
import Preferences from "./Preferences";
import Questions from "./Questions";
import React, { memo, useId, useState } from "react";
import WebCamera from "./WebCamera";
import firebase, { sendImage } from "../services/Firebase";
import useAuth from "../hooks/useAuth";
import { isAudio } from "../utility/AudioUtility";
import { useMessages } from "../hooks/useMessages";

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
        className="btn btn-outline test"
        onClick={() => handleGeoLocation()}
        title="Send Location"
      >
        <i className="fa fa-map-marker"></i>
      </button>

      <button
        className="btn btn-outline gray"
        onClick={() => setIsModalOpen(true)}
        title="Take Selfie"
      >
        <i className="fa fa-camera"></i>
      </button>

      <button
        className="btn btn-outline blue image-picker-button"
        title="Send Picture"
      >
        <label className="image-picker-label" htmlFor={imagePickerId}>
          <i className="fa fa-image"></i>
        </label>
      </button>

      <button
        className="btn btn-outline green"
        onClick={() => setShowPicker((val) => !val)}
        title="Send Emoji"
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
        title="Save Chat"
      >
        <i className="fa fa-file-text-o"></i>
      </button>

      <Questions />

      <button
        className="btn btn-outline black"
        onClick={(_e) => firebase.auth().signOut()}
        title="Sign Out"
      >
        <i className="fa fa-sign-out"></i>
      </button>
    </div>
  );
};

export default memo(Features);
