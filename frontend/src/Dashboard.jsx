
import React, { useEffect, useState, useCallback } from "react";
import { format } from "date-fns";
import { API_URL } from "./config";
import "./Dashboard.css";

function Dashboard({ token }) {
  const [userInfo, setUserInfo] = useState({});
  const [reservations, setReservations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ startDate: "", endDate: "" });

  const fetchReservations = useCallback(() => {
    fetch(`${API_URL}/api/reservations`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setReservations(data))
      .catch((err) => console.error(err));
  }, [token]);

  useEffect(() => {
    setUserInfo({ name: "Capitainerie", email: "capitainerie@example.com" });
    fetchReservations();
  }, [fetchReservations]);

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette réservation ?")) return;

    await fetch(`${API_URL}/api/reservations/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchReservations();
  };

  const handleEdit = (resv) => {
    setEditingId(resv._id);
    setFormData({ startDate: resv.startDate, endDate: resv.endDate });
  };

  const handleUpdate = async (id) => {
    await fetch(`${API_URL}/api/reservations/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    setEditingId(null);
    fetchReservations();
  };

  return (
    <div className="dashboard-container">
      <h2>Tableau de bord</h2>
      <p>Utilisateur connecté : {userInfo.name} ({userInfo.email})</p>
      <p>Date du jour : {format(new Date(), "dd/MM/yyyy")}</p>

      <h3>Réservations en cours</h3>
      <table className="reservations-table">
        <thead>
          <tr>
            <th>Catway</th>
            <th>Bateau</th>
            <th>Client</th>
            <th>Début</th>
            <th>Fin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((resv) => (
            <tr key={resv._id}>
              <td>{resv.catwayName}</td>
              <td>{resv.boatName}</td>
              <td>{resv.clientName}</td>
              <td>
                {editingId === resv._id ? (
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                ) : (
                  resv.startDate
                )}
              </td>
              <td>
                {editingId === resv._id ? (
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                ) : (
                  resv.endDate
                )}
              </td>
              <td>
                {editingId === resv._id ? (
                  <button onClick={() => handleUpdate(resv._id)}>✅ Sauvegarder</button>
                ) : (
                  <button onClick={() => handleEdit(resv)}>✏️ Modifier</button>
                )}
                <button onClick={() => handleDelete(resv._id)}>🗑 Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
