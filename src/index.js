import "./index.scss";
import "bootstrap/dist/js/bootstrap.js";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
