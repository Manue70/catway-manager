
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./config";
import "./Catways.css";

function Catways({ token, userRole }) {
  const [catways, setCatways] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCatway, setSelectedCatway] = useState(null);
  const [reservationData, setReservationData] = useState({
    clientName: "",
    startDate: "",
    endDate: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCatways() {
      try {
        const res = await fetch(`${API_URL}/api/catways`, {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        console.log("Réponse API:", res);

        if (!res.ok) {
          const text = await res.text();
          console.error("Erreur API:", res.status, text);
          throw new Error(`Erreur API ${res.status}`);
        }

        const data = await res.json();
        console.log("Données reçues:", data);

        if (Array.isArray(data)) {
          setCatways(data);
        } else if (data.catways && Array.isArray(data.catways)) {
          setCatways(data.catways);
        } else {
          setError("Format de données inattendu depuis l’API");
        }
      } catch (err) {
        console.error("Erreur récupération catways:", err);
        setError("Impossible de charger les catways");
      } finally {
        setLoading(false);
      }
    }

    fetchCatways();
  }, [token]);

  const handleEdit = (id) => navigate(`/edit-catway/${id}`);

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce catway ?")) return;

    try {
      const res = await fetch(`${API_URL}/api/catways/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Erreur suppression");
      setCatways(catways.filter((c) => c._id !== id));
      alert("Catway supprimé !");
    } catch (err) {
      console.error(err);
      alert("Erreur réseau ou suppression impossible");
    }
  };

  const handleReserve = (catway) => {
    setSelectedCatway(catway);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedCatway(null);
    setShowModal(false);
    setReservationData({ clientName: "", startDate: "", endDate: "" });
  };

  const handleChange = (e) => {
    setReservationData({ ...reservationData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCatway) return;

    try {
      const res = await fetch(`${API_URL}/api/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          catwayId: selectedCatway._id,
          ...reservationData,
        }),
      });

      if (!res.ok) throw new Error("Erreur lors de la réservation");
      alert("Réservation effectuée !");
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Erreur réseau ou réservation impossible");
    }
  };

  if (loading) return <p>Chargement des catways...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (catways.length === 0) return <p>Aucun catway disponible</p>;

  return (
    <>
      <div className="CatwaysContainer">
        <h2 className="catways-title">Liste des Catways</h2>

        {userRole === "capitainerie" && (
          <button className="btnAddCatway" onClick={() => navigate("/add-catway")}>
            Ajouter un Catway
          </button>
        )}

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>État</th>
              {userRole === "capitainerie" && <th>Actions</th>}
              <th>Réserver</th>
            </tr>
          </thead>
          <tbody>
            {catways.map((catway) => (
              <tr key={catway._id}>
                <td>{catway.catwayNumber}</td>
                <td>{catway.catwayType}</td>
                <td>{catway.catwayState}</td>
                {userRole === "capitainerie" && (
                  <td>
                    <button onClick={() => handleEdit(catway._id)}>Modifier</button>
                    <button className="btnDelete" onClick={() => handleDelete(catway._id)}>
                      Supprimer
                    </button>
                  </td>
                )}
                <td>
                  <button onClick={() => handleReserve(catway)}>Réserver</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h3>Réserver le catway {selectedCatway.catwayNumber}</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Nom du client :
                <input
                  type="text"
                  name="clientName"
                  value={reservationData.clientName}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Date de début :
                <input
                  type="date"
                  name="startDate"
                  value={reservationData.startDate}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Date de fin :
                <input
                  type="date"
                  name="endDate"
                  value={reservationData.endDate}
                  onChange={handleChange}
                  required
                />
              </label>
              <div className="modalButtons">
                <button type="submit">Envoyer</button>
                <button type="button" onClick={closeModal}>
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Catways;
