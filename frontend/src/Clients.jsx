
import React, { useState, useEffect } from "react";
import { API_URL } from "./config";
import "./Clients.css";

function Clients({ token }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState({ email: "", password: "", role: "client" });
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_URL}/api/users`, {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`Erreur ${res.status}`);
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
        setError("Erreur récupération utilisateurs");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;
    try {
      const res = await fetch(`${API_URL}/api/users/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erreur suppression");
      setUsers(users.filter((u) => u._id !== id));
      if (selectedUser && selectedUser._id === id) setSelectedUser(null);
    } catch (err) {
      console.error(err);
      alert("Erreur suppression utilisateur");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(newUser),
      });
      if (!res.ok) throw new Error("Erreur création utilisateur");
      const createdUser = await res.json();
      setUsers([...users, createdUser]);
      setNewUser({ email: "", password: "", role: "client" });
    } catch (err) {
      console.error(err);
      alert("Erreur création utilisateur");
    }
  };

  const handleDetails = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/users/${id}`, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erreur récupération détails");
      const user = await res.json();
      setSelectedUser(user);
    } catch (err) {
      console.error(err);
      alert("Impossible de récupérer les détails");
    }
  };

  if (loading) return <p>Chargement des utilisateurs...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="ClientsContainer">
      <h2>Gestion des Clients</h2>

      <form onSubmit={handleCreate} className="createUserForm">
        <input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} required />
        <input type="password" placeholder="Mot de passe" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} required />
        <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
          <option value="client">Client</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Créer</button>
      </form>

      {users.length === 0 ? <p>Aucun utilisateur disponible</p> : (
        <table>
          <thead><tr><th>Email</th><th>Rôle</th><th>Actions</th></tr></thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleDetails(user._id)}>Détails</button>
                  <button onClick={() => handleDelete(user._id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedUser && (
        <div className="userDetails">
          <h3>Détails de l'utilisateur</h3>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p><strong>Rôle:</strong> {selectedUser.role}</p>
          <button onClick={() => setSelectedUser(null)}>Fermer</button>
        </div>
      )}
    </div>
  );
}

export default Clients;
