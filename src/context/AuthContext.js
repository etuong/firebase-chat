import * as firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import React from "react";

import { FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider } from "firebase/auth";
import "firebaseui/dist/firebaseui.css";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

const app =initializeApp(firebaseConfig);

var uiConfig = {
  signInSuccessUrl: "/",
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    FacebookAuthProvider.PROVIDER_ID,
    TwitterAuthProvider.PROVIDER_ID,
  ],
};

var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start("#firebaseui-auth-container", uiConfig);

const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [user, setUser] = React.useState(null);

  firebase.auth().onAuthStateChanged(
    function (_user) {
      setUser(_user);
    },
    function (error) {
      console.log(error);
    }
  );

  const value = { user };

  return <AuthContext.Provider value={value} {...props} />;
};

export { AuthContext, AuthProvider };
