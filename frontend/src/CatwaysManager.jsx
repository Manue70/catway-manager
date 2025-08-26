
import React, { useEffect, useState } from "react";
import { API_URL } from "./config";
import "./Catways.css";

function CatwaysManager({ token }) {
  const [catways, setCatways] = useState([]);

  useEffect(() => {
    const fetchCatways = async () => {
      try {
        const res = await fetch(`${API_URL}/api/catways`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Erreur récupération catways");
        const data = await res.json();
        setCatways(data);
      } catch (err) {
        console.error("Erreur récupération catways :", err);
      }
    };
    fetchCatways();
  }, [token]);

  const handleDelete = (id) => {
    if (!window.confirm("Supprimer ce catway ?")) return;
    fetch(`${API_URL}/api/catways/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => setCatways(catways.filter((c) => c._id !== id)));
  };

  return (
    <div className="CatwaysContainer">
      <h2 className="catways-title">Gestion des Catways</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>État</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {catways.map((catway) => (
            <tr key={catway._id}>
              <td>{catway.catwayNumber}</td>
              <td>{catway.catwayType}</td>
              <td>{catway.catwayState}</td>
              <td>
                <button>Modifier</button>{" "}
                <button className="btnDelete" onClick={() => handleDelete(catway._id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CatwaysManager;
