
import express from "express";
import fs from "fs";
import path from "path";
import Reservation from "../models/Reservation.js";  // ✅ modèle Mongoose

const router = express.Router();

/**
 * GET - Récupérer toutes les réservations
 */
router.get("/", async (req, res) => {
  try {
    let reservations = await Reservation.find();

    if (reservations.length === 0) {
      const filePath = path.resolve("backend/data/reservations.json");
      const data = fs.readFileSync(filePath, "utf-8");
      reservations = JSON.parse(data);

      await Reservation.insertMany(reservations);
    }

    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

/**
 * PUT - Modifier une réservation (dates, bateau, client…)
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body; // contient les champs à mettre à jour

    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // retourne le document modifié
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    res.json(updatedReservation);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

/**
 * DELETE - Supprimer une réservation
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedReservation = await Reservation.findByIdAndDelete(id);

    if (!deletedReservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    res.json({ message: "Réservation supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

export default router;


