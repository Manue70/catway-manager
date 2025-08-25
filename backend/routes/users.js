
import express from "express";
import User from "../models/User.js"; // ton modèle Mongoose
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// GET tous les utilisateurs (protégé)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // exclude password
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// GET un utilisateur par ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "-password");
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// DELETE un utilisateur par ID
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Utilisateur supprimé" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// POST créer un utilisateur
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { email, role, password } = req.body;
    const newUser = new User({ email, role, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur création utilisateur" });
  }
});

export default router;
