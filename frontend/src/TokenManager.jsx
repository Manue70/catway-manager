
import { useState } from "react";
import { API_URL } from "../config";

function TokenManager() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const loginAndFetch = async () => {
    try {
      // 1️⃣ Connexion pour générer token
      const loginRes = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginRes.json();

      if (!loginRes.ok) {
        setError(loginData.message || "Erreur login");
        setToken("");
        return;
      }

      const newToken = loginData.token;
      localStorage.setItem("token", newToken);
      setToken(newToken);
      setError("");

      // 2️⃣ Test fetch avec token
      const testRes = await fetch(`${API_URL}/api/catways`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newToken}`,
        },
      });

      const testData = await testRes.json();
      if (testRes.ok) {
        setResponse(JSON.stringify(testData, null, 2));
        setError("");
      } else {
        setResponse("");
        setError(`${testRes.status} : ${testData.message || "Erreur inconnue"}`);
      }
    } catch (err) {
      console.error(err);
      setError("Erreur réseau ou serveur indisponible");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gestion et Test du Token</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={loginAndFetch}>Se connecter & Tester Catways</button>
      </div>

      <p><strong>Token actuel :</strong> {token || "non trouvé"}</p>

      {response && (
        <>
          <h3>Réponse du backend :</h3>
          <pre>{response}</pre>
        </>
      )}
      {error && (
        <>
          <h3 style={{ color: "red" }}>Erreur :</h3>
          <p>{error}</p>
        </>
      )}
    </div>
  );
}

export default TokenManager;

