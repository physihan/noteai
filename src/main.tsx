import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
// main.ts
import "virtual:uno.css";
import "virtual:svg-icons-register";
import '@unocss/reset/normalize.css'
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <App />
);
