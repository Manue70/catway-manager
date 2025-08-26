
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";


import "./style.css";

// Si tu as d'autres CSS pour les composants
import "./Home.css";
import "./Dashboard.css";
import "./Catways.css";
import "./AddCatway.css";
import "./Reservations.css";
import "./Clients.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


