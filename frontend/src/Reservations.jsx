
import React, { useEffect, useState } from "react";
import { API_URL } from "./config";
import "./Reservations.css";

function Reservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/reservations`)
      .then((res) => res.json())
      .then((data) => setReservations(data))
      .catch((err) => console.error(err));
  }, []);

  if (reservations.length === 0) return <p>Aucune réservation trouvée.</p>;

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
              <td>{resv.catwayNumber}</td>
              <td>{resv.boatName}</td>
              <td>{resv.clientName}</td>
              <td>{resv.startDate}</td>
              <td>{resv.endDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reservations;
