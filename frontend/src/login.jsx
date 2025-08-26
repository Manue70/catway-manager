
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./config";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();
      let data;
      try { data = JSON.parse(text); } catch { throw new Error("Le serveur n'a pas renvoyé de JSON valide"); }

      if (res.ok && data.token && data.role) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        onLoginSuccess(data.token, data.role);
        navigate("/catways");
      } else {
        setError(data.message || "Impossible de se connecter");
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

      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ display: "block", marginBottom: "10px", width: "100%" }} />
      <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} style={{ display: "block", marginBottom: "10px", width: "100%" }} />
      <button onClick={handleLogin} style={{ width: "100%" }}>Se connecter</button>
    </div>
  );
}

export default Login;

