
import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret123"; 

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Email ou mot de passe incorrect" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Email ou mot de passe incorrect" });

    const token = jwt.sign(
      { userId: user._id, role: user.role }, 
      JWT_SECRET,                            
      { expiresIn: "2h" }
    );

    console.log("User au login :", user); 
    res.json({ token, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;

