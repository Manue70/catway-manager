
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/auth.js";
import catwayRoutes from "./routes/catways.js";
import reservationRoutes from "./routes/reservations.js";
import addReservationRoutes from "./routes/addReservation.js";
import usersRouter from "./routes/users.js";

dotenv.config();

const app = express();

// Middleware
 app.use(cors({
  origin: "http://localhost:5173",  // Vite dev local
  origin: "https://catway-manager-1.onrender.com"
}));
app.use(express.json());

// Routes API
app.use("/api/auth", authRoutes);
app.use("/api/catways", catwayRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/addReservation", addReservationRoutes);
app.use("/api/users", usersRouter);

// Servir le build Vite (frontend/dist)
const __dirname = path.resolve();
const frontendDistPath = path.join(__dirname, "../frontend/dist");

// Vérifie que le dossier build existe avant de servir
import fs from "fs";
if (!fs.existsSync(frontendDistPath)) {
  console.warn("⚠️ Build frontend introuvable ! Vérifie que 'frontend/dist' est push sur GitHub.");
} else {
  app.use(express.static(frontendDistPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

// Connexion MongoDB et démarrage du serveur
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB connecté");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Serveur démarré sur le port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error("❌ Erreur MongoDB:", err));
