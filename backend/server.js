
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";



import cors from "cors";
import dotenv from "dotenv";
import catwayRoutes from "./routes/catways.js";
import reservationRoutes from "./routes/reservations.js";
import addReservationRoutes from "./routes/addReservation.js";
import usersRouter from "./routes/users.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,               
}));


// Middlewares
app.use(express.json());

// Routes
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
    app.listen(5000, () => console.log("🚀 Serveur démarré sur http://localhost:5000"));
  })
  .catch((err) => console.error("Erreur MongoDB:", err));
