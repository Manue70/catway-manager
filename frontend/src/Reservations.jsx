
import React, { useEffect, useState } from "react";
import { API_URL } from "./config";
import "./Reservations.css";

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [catways, setCatways] = useState([]);

  useEffect(() => {
    // Récupérer les réservations
    fetch(`${API_URL}/api/reservations`)
      .then((res) => res.json())
      .then((data) => setReservations(data))
      .catch((err) => console.error(err));

    // Récupérer les catways
    fetch(`${API_URL}/api/catways`)
      .then((res) => res.json())
      .then((data) => setCatways(data))
      .catch((err) => console.error(err));
  }, []);

  if (reservations.length === 0) return <p>Aucune réservation trouvée.</p>;

  // Fonction pour récupérer le numéro du catway depuis l'ID
  const getCatwayNumber = (id) => {
    const catway = catways.find((c) => c._id === id);
    return catway ? catway.catwayNumber : "N/A";
  };

  return (
    <div className="ReservationsContainer">
      <h2 className="reservations-title">Liste des Réservations</h2>
      <table className="reservations-table">
        <thead>
          <tr>
            <th>Catway</th>
            <th>Bateau</th>
            <th>Client</th>
            <th>Début</th>
            <th>Fin</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((resv) => (
            <tr key={resv._id}>
              <td>{getCatwayNumber(resv.catwayId)}</td>
              <td>{resv.boatName}</td>
              <td>{resv.clientName}</td>
              <td>{new Date(resv.startDate).toLocaleDateString()}</td>
              <td>{new Date(resv.endDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reservations;
