
// backend/createUser.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "./models/User.js";  // Vérifie bien le chemin

dotenv.config();

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const createUser = async () => {
  const hashedPassword = await bcrypt.hash("motdepasse123", 10);
  const user = new User({
    email: "capitainerie@example.com",
    password: hashedPassword,
    role: "capitainerie"
  });
  await user.save();
  console.log("✅ Utilisateur capitainerie créé !");
  mongoose.disconnect();
};

// Appel de la fonction
createUser();
