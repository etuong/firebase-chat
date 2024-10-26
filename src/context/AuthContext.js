import React, { useEffect } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import auth from "../services/Firebase";

const AuthContext = React.createContext();

const AuthProvider = (children) => {
  const [user, setUser] = React.useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,
      (_user) => setUser(_user),
      (_error) => console.log(_error)
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const value = { user };

  return <AuthContext.Provider value={value} {...children} />;
};

export { AuthContext, AuthProvider };
