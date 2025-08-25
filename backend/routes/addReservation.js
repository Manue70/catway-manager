
import express from "express";
import Reservation from "../models/Reservation.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// -----------------------------
// Créer une réservation - UTILISATEUR connecté
router.post("/", auth, async (req, res) => {
  try {
    const { catwayId, boatName, clientName, startDate, endDate } = req.body;

    const newReservation = new Reservation({
      catwayId,
      boatName,
      clientName,
      startDate,
      endDate,
      createdBy: req.user.id,
    });

    const saved = await newReservation.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
