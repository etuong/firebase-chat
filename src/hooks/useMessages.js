import React, { useEffect } from "react";
import { getMessages } from "../services/Firebase";

export const useMessages = () => {
  const [messages, setMessages] = React.useState([]);

  useEffect(() => {
    const unsubscribe = getMessages(setMessages);

    return () => {
      unsubscribe();
    };
  }, []);

  return messages;
};
