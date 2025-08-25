
import React from "react";
import Dashboard from "./Dashboard";
import CatwaysManager from "./CatwaysManager";

function Manager({ token }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Espace Manager</h1>
      <Dashboard token={token} />
      <CatwaysManager token={token} />
    </div>
  );
}

export default Manager;
