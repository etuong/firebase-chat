import React, { useEffect } from "react";
import { getTypists } from "../services/Firebase";
import useAuth from "./useAuth";

export const useTypists = () => {
  const user = useAuth();
  const [typists, setTypists] = React.useState([]);

  useEffect(() => {
    const unsubscribe = getTypists(setTypists, user);

    return () => {
      unsubscribe();
    };
  }, []);

  return typists;
};
