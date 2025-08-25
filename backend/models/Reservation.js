
import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  catwayId: String,
  boatName: String,
  clientName: String,
  startDate: String,
  endDate: String,
});

export default mongoose.models.Reservation || mongoose.model("Reservation", reservationSchema);





