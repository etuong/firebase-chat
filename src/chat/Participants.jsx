import React from "react";

const Participants = ({ profilePic, name }) => {
  return (
    <div
      className="participant"
      style={{ backgroundImage: `url(${profilePic})` }}
      title={name}
    ></div>
  );
};

export default Participants;
