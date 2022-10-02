import EmojiPicker from "emoji-picker-react";
import React, { memo, useState, useId } from "react";
import { uploadImage } from "utility/ImageUtility";
import ImagePicker from "./ImagePicker";
import Preferences from "./Preferences";
import Questions from "./Questions";
import WebCamera from "./WebCamera";

const Features = ({
  messageBoxRef,
  handleSaveChat,
  sendMessage,
  setShowPreferences,
  showPreferences,
  showSender,
  setShowSender,
  fontSize,
  setFontSize
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imagePickerId = useId();

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
        callback={(selfie) => uploadImage(selfie, false, sendMessage)}
      />

      <ImagePicker
        tag={imagePickerId}
        callback={sendMessage}
        isProfileCloud={false}
      />

      <button
        className="btn btn-outline-danger"
        onClick={() => setShowPicker((val) => !val)}
      >
        <i className="fa fa-smile-o"></i>
      </button>

      <button
        className="btn btn-outline-success"
        onClick={() => setIsModalOpen(true)}
      >
        <i className="fa fa-camera"></i>
      </button>

      <button className="btn btn-outline-info image-picker-button">
        <label className="image-picker-label" htmlFor={imagePickerId}>
          <i className="fa fa-image"></i>
        </label>
      </button>

      <Preferences
        showPreferences={showPreferences}
        setShowPreferences={setShowPreferences}
        showSender={showSender}
        setShowSender={setShowSender}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />

      <button
        className="btn btn-outline-warning"
        onClick={(_e) => handleSaveChat()}
      >
        <i className="fa fa-file-text-o"></i>
      </button>

      <Questions />
    </div>
  );
};

export default memo(Features);
