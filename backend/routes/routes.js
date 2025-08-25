
import express from "express";
import Reservation from "../models/Reservation.js";
import Catway from "../models/Catway.js"; 
import checkRole from "../middleware/checkRole.js";
import auth, { authOptional } from "../middleware/auth.js";

const router = express.Router();

// GET public : afficher les réservations (peut être la même route que reservations)
router.get("/", authOptional, async (req, res) => {
  try {
    const reservations = await Reservation.find().populate("catwayId");
    res.json(reservations);
  } catch (err) {
    console.error("Erreur lors de la récupération des réservations :", err);
    res.status(500).json({ error: err.message });
  }
});

// POST protégé : ajouter une réservation (capitainerie uniquement)
router.post("/", auth, checkRole("capitainerie"), async (req, res) => {
  try {
    const { catwayNumber, boatName, clientName, startDate, endDate } = req.body;

    if (!catwayNumber) return res.status(400).json({ error: "catwayNumber manquant" });

    const catway = await Catway.findOne({ catwayNumber });
    if (!catway) return res.status(404).json({ error: "Catway introuvable" });

    const newReservation = new Reservation({
      catwayId: catway._id,
      boatName,
      clientName,
      startDate,
      endDate
    });

    const saved = await newReservation.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Erreur lors de la création de la réservation :", err);
    res.status(400).json({ error: err.message });
  }
});

export default router;
