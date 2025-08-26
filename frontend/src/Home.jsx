

import React, { useState } from "react";
import { API_URL } from "./config";
import "./Home.css";

function Home({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Connexion échouée");
      const data = await res.json();
      onLogin(data.token, data.role);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <div className="home-container">
        <h1>Bienvenue sur CatWay Manager</h1>
        <div className="features-content">
          <p>
            Gérez facilement les catways et les réservations de votre port. <br />
            Suivez les disponibilités,<br /> organisez vos clients et simplifiez la gestion quotidienne en toute sécurité.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Se connecter</button>
        </form>
      </div>

      <div className="home-links">
        <a href={`${API_URL}/swagger.yaml`} target="_blank" rel="noopener noreferrer">Documentation Swagger</a>
        <br />
        <a href="https://github.com/Manue70/catway-manager/blob/main/README.md" target="_blank" rel="noopener noreferrer">README GitHub</a>
      </div>
    </>
  );
}

export default Home;
