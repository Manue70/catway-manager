
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "./models/User.js"; // adapte le chemin si besoin

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function resetPassword(email, newPassword) {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Utilisateur non trouvé !");
      return;
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    console.log(`Mot de passe de ${email} mis à jour avec succès !`);
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}
resetPassword("capitainerie@example.com", "Manue123");
