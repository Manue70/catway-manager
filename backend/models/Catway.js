
import mongoose from "mongoose";

const catwaySchema = new mongoose.Schema({
  catwayNumber: { type: Number, required: true },
  catwayType: { type: String, required: true },
  catwayState: { type: String, required: true },
  catwayDescription: { type: String, default: "" },
});

// ⚠️ Important : pour éviter le "Cannot overwrite 'Catway' model" après redémarrage
const Catway = mongoose.models.Catway || mongoose.model("Catway", catwaySchema);

export default Catway;



