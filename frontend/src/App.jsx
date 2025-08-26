
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style.css";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Manager from "./Manager";
import Catways from "./Catways";
import Reservations from "./Reservations";
import AddReservation from "./AddReservation";
import CatwaysManager from "./CatwaysManager";
import AddCatway from "./AddCatway";
import Clients from "./Clients";
import Login from "./login";
import PrivateRoute from "./PrivateRoute";
import Navbar from "./Navbar";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || "");

  const handleLogin = (newToken, role) => {
    setToken(newToken);
    setUserRole(role);
    localStorage.setItem("token", newToken);
    localStorage.setItem("role", role);
  };

  const handleLogout = () => {
    setToken("");
    setUserRole("");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  return (
    <Router>
      <Navbar userRole={userRole} token={token} onLogout={handleLogout} />

      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Home onLogin={handleLogin} />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLogin} />} />
        <Route path="/manager" element={<Manager token={token} />} />
        <Route path="/catways" element={<Catways token={token} userRole={userRole} />} />
        <Route path="/reservations" element={<Reservations token={token} />} />
        <Route path="/add-reservation" element={<AddReservation token={token} />} />

        {/* Routes protégées (admin) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute token={token} userRole={userRole} requiredRole="admin">
              <Dashboard token={token} />
            </PrivateRoute>
          }
        />
        <Route
          path="/catways-manager"
          element={
            <PrivateRoute token={token} userRole={userRole} requiredRole="admin">
              <CatwaysManager token={token} />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-catway"
          element={
            <PrivateRoute token={token} userRole={userRole} requiredRole="admin">
              <AddCatway token={token} />
            </PrivateRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <PrivateRoute token={token} userRole={userRole} requiredRole="admin">
              <Clients token={token} />
            </PrivateRoute>
          }
        />

        {/* Route 404 */}
        <Route path="*" element={<h1>Page non trouvée</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
