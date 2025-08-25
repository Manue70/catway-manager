
import express from "express";
import fs from "fs";
import path from "path";
import Catway from "../models/Catway.js"; // modèle déjà corrigé avec mongoose.models.Catway || ...

const router = express.Router();

// GET tous les catways
router.get("/", async (req, res) => {
  try {
    // On récupère les catways dans la DB
    let catways = await Catway.find();

    // Si la DB est vide, on charge depuis le fichier JSON et on insère une seule fois
    if (catways.length === 0) {
      const filePath = path.resolve("backend/data/catways.json");
      const data = fs.readFileSync(filePath, "utf-8");
      const catwaysFromFile = JSON.parse(data);

      if (Array.isArray(catwaysFromFile) && catwaysFromFile.length > 0) {
        // On vérifie que les catways ne sont pas déjà insérés
        await Catway.insertMany(catwaysFromFile);
        catways = await Catway.find(); // on récupère les catways nouvellement insérés
      }
    }

    res.json(catways);
  } catch (err) {
    console.error("Erreur récupération catways :", err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

export default router;



