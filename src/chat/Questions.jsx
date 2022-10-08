import React from "react";
import Popup from "reactjs-popup";

const Questions = () => (
  <Popup
    contentStyle={{ width: "320px" }}
    trigger={
      <button className="btn btn-outline-primary">
        <i className="fa fa-question"></i>
      </button>
    }
    position="bottom right"
    nested
  >
    {(close) => (
      <div className="popup">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header">Chat With Me!</div>
        <div className="content">
          <p>
            Chat With Me is a public chatroom where any participant can send
            text messages, audio voicemails, images, emojis, and even selfies!
            Online communication can help young people build and develop social
            skills and gives them a platform to share their skills and help each
            other out.
          </p>
          <p>
            Messages are stored on my Firebase server and will be deleted
            monthly. Your information is absolutely anonymous.
          </p>
          <p>
            This web app was designed and built by{" "}
            <a
              href="https://www.ethanuong.com"
              target="_blank"
              rel="noreferrer"
            >
              Ethan Uong
            </a>
            . If you are a developer and would like to contribute to this
            project, please visit the{" "}
            <a
              href="https://github.com/etuong/firebase-chat"
              target="_blank"
              rel="noreferrer"
            >
              Github repository
            </a>
            . Thank you!
          </p>
          <div>
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

export default Questions;
