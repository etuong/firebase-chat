import React from "react";
import Popup from "reactjs-popup";
import AvatarSelector from "./AvatarSelector";
import NameSelector from "./NameSelector";

const Welcome = ({
  participantCount,
  participant,
  updateParticipantProfile,
}) => (
  <Popup open={true} modal>
    {(close) => (
      <div className="popup">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header">Welcome!</div>
        <div className="content">
          <div className="welcome-item">
            <b>Current Number of Participants:</b> {participantCount}
          </div>
          <div className="welcome-item welcome-flex">
            <div className="welcome-avatar">
              <AvatarSelector
                participantPic={participant?.profilePic}
                updateParticipantProfile={updateParticipantProfile}
              />
            </div>
            <b className="welcome-avatar-text">
              You may change your profile picture otherwise a random avatar will
              be assigned
            </b>
          </div>
          <div className="welcome-item">
            <b>
              You may change your name otherwise a random name will be given to
              you
            </b>
            <NameSelector
              participantName={participant?.name}
              updateParticipantProfile={updateParticipantProfile}
            />
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

export default Welcome;
