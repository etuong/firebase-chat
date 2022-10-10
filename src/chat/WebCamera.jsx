import React, { memo, useState } from "react";
import Webcam from "react-webcam";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: "0",
    border: "none",
    background: "transparent",
    transform: "translate(-50%, -50%)",
  },
};

Modal.defaultStyles.overlay.backgroundColor = "rgba(0,0,0,0.7)";
Modal.setAppElement("#root");

const WebCamera = ({ isModalOpen, setIsModalOpen, callback }) => {
  const [selfie, setSelfie] = useState("");
  const webcamRef = React.useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setSelfie(imageSrc);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      style={customStyles}
    >
      <div className="webcam-container">
        <div className="webcam-image">
          {selfie === "" ? (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
          ) : (
            <img src={selfie} alt="" />
          )}
        </div>
        <div className="button-container">
          {selfie !== "" ? (
            <React.Fragment>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setSelfie("");
                }}
                className="webcam-btn btn btn-danger"
              >
                Retake Selfie
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  callback(selfie);
                  setSelfie("");
                  setIsModalOpen(false);
                }}
                className="webcam-btn btn btn-success"
              >
                Send Selfie
              </button>
            </React.Fragment>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                capture();
              }}
              className="webcam-btn btn btn-info"
            >
              Capture
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default memo(WebCamera);
