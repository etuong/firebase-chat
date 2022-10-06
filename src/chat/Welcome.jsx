import React from "react";
import Popup from "reactjs-popup";
import { useAuth } from "../hooks/useAuth";

const Welcome = () => {
  const { login } = useAuth();

  return (
    <Popup open={true} modal>
      {(close) => (
        <div className="popup">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header">Welcome!</div>
          <div className="content">
            <div className="welcome-item">
              <h5>Please log in to chat!</h5>
              <div>
                <button onClick={login} className="login">
                  Login with Google
                </button>
              </div>
            </div>
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
};

export default Welcome;
