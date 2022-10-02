import "./index.scss";
import "bootstrap/dist/js/bootstrap.js";
import ChatRoom from "./chat/ChatRoom";
import React from "react";
import ReactDOM from "react-dom/client";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<ChatRoom />);
