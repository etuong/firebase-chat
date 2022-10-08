import React, { memo } from "react";
import  useAuth  from "../hooks/useAuth";

const Header = () => {
  const { user } = useAuth();

  return (
    <>
      <b className="name">{user.displayName}</b>
    </>
  );
};

export default memo(Header);
