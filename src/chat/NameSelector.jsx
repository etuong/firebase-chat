import React, { useEffect, useRef, useState } from "react";

const NameSelector = ({ participantName, updateParticipantProfile }) => {
  const [name, setName] = useState("");
  const [isNameEdit, setIsNameEdit] = useState(false);
  const nameRef = useRef(null);

  useEffect(() => {
    if (participantName) {
      setName(participantName);
    }
  }, [participantName]);

  useEffect(() => {
    if (isNameEdit) {
      const end = nameRef.current.value.length;
      nameRef.current.setSelectionRange(end, end);
      nameRef.current.focus();
    } else if (name) {
      handleProfileUpdate();
    }
  }, [isNameEdit, name]);

  const handleProfileUpdate = () => {
    localStorage.setItem("name", name);
    updateParticipantProfile("name", name);
  };

  return (
    <div className="name">
      {isNameEdit ? (
        <input
          type="text"
          ref={nameRef}
          value={name}
          className="editing"
          onChange={(e) => setName(e.target.value)}
        />
      ) : (
        <>{name}</>
      )}
      <span
        className={`pencil ${isNameEdit ? "edit" : "notEdit"}`}
        onClick={(_) => {
          setIsNameEdit(!isNameEdit);
        }}
      >
        &#9998;
      </span>
    </div>
  );
};

export default NameSelector;
