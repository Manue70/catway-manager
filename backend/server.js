
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url"; // <-- pour __dirname en ES module

import authRoutes from "./routes/auth.js";
import catwayRoutes from "./routes/catways.js";
import reservationRoutes from "./routes/reservations.js";
import addReservationRoutes from "./routes/addReservation.js";
import usersRouter from "./routes/users.js";

dotenv.config();

const app = express();

// Middleware CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Vite dev local
      "https://catway-manager-1.onrender.com", // Render
    ],
  })
);
app.use(express.json());

// Routes API
app.use("/api/auth", authRoutes);
app.use("/api/catways", catwayRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/addReservation", addReservationRoutes);
app.use("/api/users", usersRouter);

// --- Servir le build Vite (frontend/dist) ---
// Création de __dirname en ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let frontendDistPath = path.join(__dirname, "../frontend/dist");

// Si le build n’existe pas, on tente un chemin relatif au root (Render)
if (!fs.existsSync(frontendDistPath)) {
  frontendDistPath = path.join(process.cwd(), "frontend/dist");
}

if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
} else {
  console.warn(
    "⚠️ Build frontend introuvable ! Le frontend sera inaccessible."
  );
}

// Connexion MongoDB et démarrage du serveur
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB connecté");
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`🚀 Serveur démarré sur le port ${port}`));
  })
  .catch((err) => console.error("❌ Erreur MongoDB:", err));

  