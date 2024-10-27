import React from "react";
import {
  loginWithGoogle,
  loginWithTwitter,
  loginWithFacebook,
  loginWithYahoo,
  loginWithGithub
} from "../services/Firebase";

const Authentication = () => {
  const buttonStyle = {
    color: '#fff',
    border: 'none',
    padding: '12px 24px',
    margin: '10px',
    borderRadius: '12px',
    cursor: 'pointer',
    width: '200px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const AuthButton = ({ callback, provider, color }) =>
    <button
      onClick={callback}
      style={{ ...buttonStyle, backgroundColor: `${color}` }}>
      Login with {provider}
    </button>


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h4 style={{ textAlign: "center", paddingTop: "15px" }}>
        Please sign in!
      </h4>
      <AuthButton callback={loginWithGoogle} provider="Google" color='#4f46e5' />
      <AuthButton callback={loginWithTwitter} provider="Twitter" color='#dc3545' />
      <AuthButton callback={loginWithFacebook} provider="Facebook" color='#198754' />
      <AuthButton callback={loginWithYahoo} provider="Yahoo" color='#adb5bd' />
      <AuthButton callback={loginWithGithub} provider="Github" color='#6f42c1' />
    </div>
  );
};

export default Authentication;
