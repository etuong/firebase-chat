import React from "react";
import {
  loginWithGoogle,
  loginWithTwitter,
  loginWithFacebook,
  loginWithYahoo,
} from "../services/Firebase";

const Authentication = () => {
  return (
    <>
      <h4 style={{ textAlign: "center", paddingTop: "15px" }}>
        Please sign in! Excuse the bad UI for now..
      </h4>
      <button onClick={loginWithGoogle}>Login with Google</button>
      <button onClick={loginWithTwitter}>Login with Twitter</button>
      <button onClick={loginWithFacebook}>Login with Facebook</button>
      <button onClick={loginWithYahoo}>Login with Yahoo</button>
    </>
  );
};

export default Authentication;
