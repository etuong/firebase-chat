import React from "react";
import { getMessages } from "../services/firebase";

export const useMessages = (roomId) => {
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = getMessages(setMessages);

    return unsubscribe;
  }, [roomId]);

  return messages;
};
