import React, { memo } from "react";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { user } = useAuth();

  return (
    <React.Fragment>
      <b className="name">{user}</b>
    </React.Fragment>
  );
};

export default memo(Header);
