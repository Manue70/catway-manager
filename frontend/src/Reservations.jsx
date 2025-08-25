
import React, { useEffect, useState } from "react";
import "./Reservations.css"; // <-- nouveau fichier CSS

function Reservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/reservations")
      .then((res) => res.json())
      .then((data) => setReservations(data))
      .catch((err) => console.error(err));
  }, []);

  if (reservations.length === 0) {
    return <p>Aucune réservation trouvée.</p>;
  }

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
              <td>{resv.catwayName}</td>
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
