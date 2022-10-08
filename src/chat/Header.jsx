import React, { memo } from "react";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { user } = useAuth();

  return (
    <>
      <div
        className="sender"
        style={{
          backgroundImage: `url(${user.photoURL})`,
        }}
      ></div>
      <b className="name">{user.displayName}</b>
    </>
  );
};

export default memo(Header);
