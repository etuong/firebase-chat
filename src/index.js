import "bootstrap/dist/js/bootstrap.js";
import React from "react";
import ReactDOM from "react-dom/client";
import ChatRoom from "./chat/ChatRoom";
import { AuthProvider } from "./context/auth";
import "./index.scss";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <AuthProvider>
    <ChatRoom />
  </AuthProvider>
);
