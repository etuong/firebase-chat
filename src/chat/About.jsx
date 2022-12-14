import React from "react";
import Popup from "reactjs-popup";
import ReactTooltip from "react-tooltip";

const About = () => (
  <Popup
    contentStyle={{ width: "320px" }}
    trigger={
      <div>
        <button className="btn btn-outline purple" data-tip data-for="faqs">
          <i className="fa fa-question"></i>
        </button>
        <ReactTooltip id="faqs" place="bottom" effect="solid">
          About App
        </ReactTooltip>
      </div>
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
            This app is built using React and Firebase. It supports multiple
            authentications such as Google, Facebook, or Twitter.
          </p>
          <p>
            Messages are stored on my Firebase server and will be deleted
            monthly. You can also delete your own messages by clicking on the X
            icon next to your messages. Your information is absolutely
            anonymous.
          </p>
          <p>
            This project was designed and built by{" "}
            <a
              href="https://www.ethanuong.com"
              target="_blank"
              rel="noreferrer"
            >
              Ethan Uong
            </a>
            . If you are a developer and would like to contribute, please visit the{" "}
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

export default About;
