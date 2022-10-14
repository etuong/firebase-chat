import React, { memo, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useTyping from "../hooks/useTyping";
import { addTypist, deleteTypist, sendMessage } from "../services/Firebase";

const SendBox = (props) => {
  const { user } = useAuth();
  const [mediaRecorder, setMediaRecorder] = useState(undefined);
  const { isTyping, startTyping, stopTyping, cancelTyping } = useTyping();

  useEffect(() => {
    if (isTyping) addTypist(user);
    else deleteTypist(user.uid);
  }, [isTyping, user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const messageField = props.messageBoxRef.current;
    if (messageField && messageField.value) {
      sendMessage(user, messageField.value);
      messageField.value = "";
      cancelTyping();
    }
  };

  const onKeyDown = (e) => {
    startTyping();
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleAudioMouseDown = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      const audioChunks = [];

      mediaRecorder.addEventListener("dataavailable", function (event) {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener("stop", function () {
        console.log(audioChunks);
        if (audioChunks[0].size < 1000) {
          return;
        }
        const audioBlob = new Blob(audioChunks);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(audioBlob);
        fileReader.onloadend = function () {
          const base64VoiceMsgString = fileReader.result;
          sendMessage(user, base64VoiceMsgString);
        };
      });

      setMediaRecorder(mediaRecorder);
    });
  };

  const handleAudioMouseUp = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setMediaRecorder(undefined);
    }
  };

  return (
    <section className="send-message">
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-0">
          <div
            className="microphone"
            onMouseDown={(_e) => handleAudioMouseDown()}
            onMouseUp={(_e) => handleAudioMouseUp()}
            onTouchStart={(_e) => handleAudioMouseDown()}
            onTouchEnd={(_e) => handleAudioMouseUp()}
          >
            <i className="fa fa-microphone"></i>
          </div>
          <textarea
            ref={props.messageBoxRef}
            className="form-control"
            placeholder="Enter message here..."
            onKeyUp={stopTyping}
            onKeyDown={onKeyDown}
          />
          <div className="deliver" onClick={handleSubmit}>
            <i className="fa fa-send"></i>
          </div>
        </div>
      </form>
    </section>
  );
};

export default memo(SendBox);
