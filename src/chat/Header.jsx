import React, { memo } from "react";

const Header = () => {
  return (
    <React.Fragment>
      <b className="name">Test!</b>
    </React.Fragment>
  );
};

export default memo(Header);
