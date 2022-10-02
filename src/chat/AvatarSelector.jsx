import React, { useEffect, useId, useState } from "react";
import ImagePicker from "./ImagePicker";

const AvatarSelector = ({ participantPic, updateParticipantProfile }) => {
  const imagePickerId = useId();
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    if (participantPic) {
      setProfilePic(participantPic);
    }
  }, [participantPic]);

  useEffect(() => {
    if (profilePic) {
      handleProfileUpdate();
    }
  }, [profilePic]);

  const handleProfileUpdate = () => {
    localStorage.setItem("profilePic", profilePic);
    updateParticipantProfile("profilePic", profilePic);
  };

  return (
    <React.Fragment>
      <ImagePicker
        tag={imagePickerId}
        callback={setProfilePic}
        isProfileCloud={true}
      />
      <label htmlFor={imagePickerId}>
        <div
          className="profile"
          style={{ backgroundImage: `url(${profilePic})` }}
        >
          <i className="camera fa fa-camera"></i>
        </div>
      </label>
    </React.Fragment>
  );
};

export default AvatarSelector;
