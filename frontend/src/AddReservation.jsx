
import React, { useState } from "react";
import { API_URL } from "./config";

function AddReservation({ token }) {
  const [form, setForm] = useState({
    catwayId: "",
    boatName: "",
    clientName: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/addReservation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("Réservation ajoutée !");
        setForm({ catwayId: "", boatName: "", clientName: "", startDate: "", endDate: "" });
      } else {
        const err = await res.json();
        alert(err.error || "Erreur lors de l'ajout !");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur réseau ou token invalide");
    }
  };

  return (
    <div>
      <h2>Nouvelle réservation</h2>
      <form onSubmit={handleSubmit}>
        <input name="catwayId" placeholder="ID Catway" value={form.catwayId} onChange={handleChange} />
        <input name="boatName" placeholder="Nom du bateau" value={form.boatName} onChange={handleChange} />
        <input name="clientName" placeholder="Nom du client" value={form.clientName} onChange={handleChange} />
        <input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
        <input type="date" name="endDate" value={form.endDate} onChange={handleChange} />
        <button type="submit">Réserver</button>
      </form>
    </div>
  );
}

export default AddReservation;
