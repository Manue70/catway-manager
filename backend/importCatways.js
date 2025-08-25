
import mongoose from "mongoose";
import dotenv from "dotenv";
import Catway from "./models/Catway.js";
import catwaysData from "./data/catways.json" assert { type: "json" };

dotenv.config();

async function importData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connecté à MongoDB");

    await Catway.deleteMany({});
    console.log("🧹 Anciennes données supprimées");

    await Catway.insertMany(catwaysData);
    console.log("✅ Nouvelles données importées avec succès");

    process.exit();
  } catch (error) {
    console.error("❌ Erreur lors de l'import :", error);
    process.exit(1);
  }
}

importData();
