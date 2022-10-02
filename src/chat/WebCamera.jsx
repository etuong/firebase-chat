import React, { memo, useState } from "react";
import Webcam from "react-webcam";
import Modal from "react-modal";

const videoConstraints = {
  width: 820,
  height: 800,
  facingMode: "user",
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    background: "whitesmoke",
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
      contentLabel="Example Modal"
    >
      <div className="webcam-container">
        <div className="webcam-image">
          {selfie === "" ? (
            <Webcam
              audio={false}
              height={380}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={420}
              videoConstraints={videoConstraints}
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
                className="webcam-btn btn btn-outline-danger"
              >
                Retake Image
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  callback(selfie);
                  setSelfie("");
                  setIsModalOpen(false);
                }}
                className="webcam-btn btn btn-outline-success"
              >
                Send Image
              </button>
            </React.Fragment>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                capture();
              }}
              className="webcam-btn btn btn-outline-info"
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
