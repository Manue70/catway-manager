
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import catwayRoutes from "./routes/catways.js";
import reservationRoutes from "./routes/reservations.js";
import addReservationRoutes from "./routes/addReservation.js";
import usersRouter from "./routes/users.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json());


app.get("/", (req, res) => {
  res.send("✅ API Catways fonctionne !");
});

// Routes API
app.use("/api/auth", authRoutes);
app.use("/api/catways", catwayRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/addReservation", addReservationRoutes);
app.use("/api/users", usersRouter);

// Connexion MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB connecté");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Serveur démarré sur le port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error("❌ Erreur MongoDB:", err));
