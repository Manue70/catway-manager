
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./config";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json(); // JSON direct

      if (res.ok && data.token && data.role) {
        // Enregistre token et role
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        // Appel de la fonction parent
        onLoginSuccess(data.token, data.role);

        // Redirection vers /catways
        navigate("/catways");
      } else {
        setError(data.message || "Email ou mot de passe incorrect");
      }
    } catch (err) {
      console.error("Erreur login :", err);
      setError("Erreur réseau : " + err.message);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Login Capitainerie</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
          required
        />
        <button type="submit" style={{ width: "100%" }}>
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default Login;

