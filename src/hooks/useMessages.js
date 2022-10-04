import React from "react";
import { getMessages } from "../services/Firebase";

export const useMessages = () => {
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = getMessages(setMessages);

    return unsubscribe;
  }, []);

  return messages;
};
