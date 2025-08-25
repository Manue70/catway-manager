
import React from "react";
import { Link } from "react-router-dom";

function Navbar({ userRole, token, onLogout }) {
  return (
    
    <nav style={{ background: "lightblue", padding: "15px",textAlign: "center" }}>
      <Link to="/">Accueil</Link> |{" "}
      <Link to="/catways">Catways</Link> |{" "}
      <Link to="/reservations">Réservations</Link> |{" "}
      
      {userRole === "admin" && (
        <>
          <Link to="/dashboard">Dashboard</Link> |{" "}
          <Link to="/catways-manager">Gestion Catways</Link> |{" "}
          <Link to="/add-catway">Ajouter Catway</Link> |{" "}
          <Link to="/clients">Clients</Link>
        </>
      )}

      {token ? (
        <button onClick={onLogout} style={{ marginLeft: "20px" }}>
          Déconnexion
        </button>
      ) : (
        <Link to="/login" style={{ marginLeft: "20px" }}>
          Connexion
        </Link>
      )}
    </nav>
  );
}

export default Navbar;

