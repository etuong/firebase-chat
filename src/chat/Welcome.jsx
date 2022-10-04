import React from "react";
import Popup from "reactjs-popup";

const Welcome = () => (
  <Popup open={true} modal>
    {(close) => (
      <div className="popup">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header">Welcome!</div>
        <div className="content">
          <div className="welcome-item"></div>
          <div className="welcome-item">
            <b>House rules</b>
            <ul>
              <li>Be respectful</li>
              <li>No profanity</li>
              <li>No nudity</li>
              <li>Have fun!</li>
            </ul>
          </div>
        </div>
      </div>
    )}
  </Popup>
);

export default Welcome;
