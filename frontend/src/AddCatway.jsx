
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./config";
import "./AddCatway.css";

function AddCatway({ token }) {
  const [catwayNumber, setCatwayNumber] = useState("");
  const [catwayType, setCatwayType] = useState("");
  const [catwayState, setCatwayState] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!catwayNumber || !catwayType || !catwayState) {
      setMessage("Tous les champs sont obligatoires");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/catways`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ catwayNumber, catwayType, catwayState }),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("Catway ajouté avec succès !");
        setCatwayNumber("");
        setCatwayType("");
        setCatwayState("");
        setTimeout(() => navigate("/catways"), 1000);
      } else {
        setMessage(data.error || "Erreur lors de l'ajout du catway");
      }
    } catch (err) {
      console.error(err);
      setMessage("Erreur réseau ou token invalide");
    }
  };

  return (
    <div className="CatwaysContainer">
      <h2>Ajouter un Catway</h2>
      {message && <p style={{ color: "red" }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Numéro du catway :
          <input type="text" value={catwayNumber} onChange={(e) => setCatwayNumber(e.target.value)} />
        </label>
        <label>
          Type :
          <input type="text" value={catwayType} onChange={(e) => setCatwayType(e.target.value)} />
        </label>
        <label>
          État :
          <input type="text" value={catwayState} onChange={(e) => setCatwayState(e.target.value)} />
        </label>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default AddCatway;
