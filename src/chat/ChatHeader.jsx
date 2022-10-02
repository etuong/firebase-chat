import React, { memo } from "react";
import AvatarSelector from "./AvatarSelector";
import NameSelector from "./NameSelector";

const ChatHeader = ({ participant, updateParticipantProfile }) => {
  return (
    <React.Fragment>
      {participant && (
        <>
          <AvatarSelector
            participantPic={participant.profilePic}
            updateParticipantProfile={updateParticipantProfile}
          />
          <NameSelector
            participantName={participant.name}
            updateParticipantProfile={updateParticipantProfile}
          />
        </>
      )}
    </React.Fragment>
  );
};

export default memo(ChatHeader);
