// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";

const USER_JOIN = "USER_JOIN";
const USER_LEAVE = "USER_LEAVE";
const NEW_MESSAGE = "NEW_MESSAGE";
const START_TYPING = "START_TYPING";
const STOP_TYPING = "STOP_TYPING";
const UPDATE_PARTICIPANT_PROFILE = "UPDATE_PARTICIPANT_PROFILE";

const SOCKET_SERVER_URL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:8081"
    : "https://chat-with-ethan.herokuapp.com";

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [typingParticipants, setTypingParticipants] = useState([]);
  const [participant, setParticipant] = useState(undefined);
  const socketRef = useRef();

  useEffect(() => {
    // At the initial load, get all existing messages in memory
    const fetchMessages = async () => {
      const response = await axios.get(`${SOCKET_SERVER_URL}/messages`);
      const result = response.data.messages;
      setMessages(result);
    };

    // At the initial load, get all current participants in the chat
    const fetchParticipants = async () => {
      const response = await axios.get(`${SOCKET_SERVER_URL}/participants`);
      const result = response.data.participants;
      setParticipants(result || []);
    };

    const fetchSocket = async () => {
      socketRef.current = socketIOClient(SOCKET_SERVER_URL);

      // Restore "this" participant's info
      let chatterName = localStorage.getItem("name");
      let chatterProfilePic = localStorage.getItem("profilePic");
      socketRef.current.emit(USER_JOIN, {
        name: chatterName,
        profilePic: chatterProfilePic,
      });

      socketRef.current.on("connect", () => {
        console.log("Handshake established!");
      });

      socketRef.current.on(USER_JOIN, (newParticipant) => {
        if (newParticipant.id === socketRef.current.id) {
          setParticipant({ ...newParticipant });
        } else {
          setParticipants((participants) => [...participants, newParticipant]);
        }
      });

      socketRef.current.on(NEW_MESSAGE, (newMessage) => {
        const incomingMessage = {
          ...newMessage,
          fromMe: newMessage.senderId === socketRef.current.id,
        };

        setMessages((currentMessages) => [...currentMessages, incomingMessage]);
      });

      socketRef.current.on(START_TYPING, (typingInfo) => {
        if (typingInfo && typingInfo.senderId !== socketRef.current.id) {
          const participant = typingInfo.participant;
          setTypingParticipants((participants) => [
            ...participants,
            participant,
          ]);
        }
      });

      socketRef.current.on(STOP_TYPING, (typingInfo) => {
        if (
          typingInfo &&
          typingInfo.participant &&
          typingInfo.senderId !== socketRef.current.id
        ) {
          const participant = typingInfo.participant;
          setTypingParticipants((participants) =>
            participants.filter((p) => p.name !== participant.name)
          );
        }
      });

      return () => {
        socketRef.current.disconnect();
      };
    };

    fetchMessages();
    fetchParticipants();
    fetchSocket();
  }, []);

  useEffect(() => {
    socketRef.current.on(UPDATE_PARTICIPANT_PROFILE, (updatedParticipant) => {
      if (updatedParticipant.id === socketRef.current.id) {
        setParticipant({ ...updatedParticipant });
      } else {
        const newList = participants.map((participant) => {
          return participant.id === updatedParticipant.id
            ? { ...updatedParticipant }
            : participant;
        });
        setParticipants(newList);
      }
    });

    socketRef.current.on(USER_LEAVE, (participant) => {
      if (participants.length > 0) {
        setParticipants((participants) =>
          participants.filter((p) => p.id !== participant.id)
        );
      }
    });
  }, [participants]);

  const updateParticipantProfile = (key, value) => {
    if (!socketRef.current) return;
    const updatedParticipant = { ...participant, [key]: value };
    socketRef.current.emit(UPDATE_PARTICIPANT_PROFILE, updatedParticipant);
  };

  const sendMessage = (newMessage) => {
    if (!socketRef.current) return;

    socketRef.current.emit(NEW_MESSAGE, {
      text: newMessage,
      senderId: socketRef.current.id,
    });
  };

  const startTypingMessage = () => {
    if (!socketRef.current) return;

    socketRef.current.emit(START_TYPING, {
      senderId: socketRef.current.id,
      participant,
    });
  };

  const stopTypingMessage = () => {
    if (!socketRef.current) return;

    socketRef.current.emit(STOP_TYPING, {
      senderId: socketRef.current.id,
      participant,
    });
  };

  return {
    messages,
    participant,
    participants,
    typingParticipants,
    sendMessage,
    startTypingMessage,
    stopTypingMessage,
    updateParticipantProfile,
  };
};

export default useChat;
