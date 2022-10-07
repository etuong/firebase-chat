import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const value = React.useContext(AuthContext);
  if (!value) {
    throw new Error("AuthContext's value is undefined.");
  }

  return value;
};

export default useAuth;

// const useFetch = (authContext) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);

//     const value = useContext(authContext);
//     if (!value) {
//       throw new Error("AuthContext's value is undefined.");
//     }

//     setData(value);
//     setLoading(false);
//   }, [authContext]);

//   return { loading, data };
// };

// export default useFetch;
