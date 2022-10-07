import React, { useEffect } from "react";
import { authUI, uiConfig } from "../services/Firebase";

const Authentication = () => {
  useEffect(() => {
    authUI.start("#firebaseui-auth-container", uiConfig);
  }, []);

  return (
    <>
      <h4 style={{ textAlign: "center", paddingTop: "15px" }}>
        Please sign in!
      </h4>
      <div id="firebaseui-auth-container"></div>
    </>
  );
};

export default Authentication;
