import React, { memo, useState } from "react";

const SendBox = (props) => {
  const [mediaRecorder, setMediaRecorder] = useState(undefined);

  const handleSubmit = (event) => {
    event.preventDefault();
    const messageField = props.messageBoxRef.current;
    if (messageField && messageField.value) {
      props.handleSendMessage(messageField.value);
      messageField.value = "";
    }
  };

  const onKeyDown = (e) => {
    props.startTyping();
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
          props.handleSendMessage(base64VoiceMsgString);
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
    <div className="chat-message clearfix">
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
            onKeyUp={props.stopTyping}
            onKeyDown={onKeyDown}
          />
          <div className="deliver" onClick={handleSubmit}>
            <i className="fa fa-send"></i>
          </div>
        </div>
      </form>
    </div>
  );
};

export default memo(SendBox);
