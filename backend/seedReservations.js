
import mongoose from "mongoose";
import Reservation from "./models/Reservation.js";
import Catway from "./models/Catway.js";
import fs from "fs";

const mongoURI = "mongodb+srv://pineramanuela:hNzqhzCqVOSAEQiM@cluster0.ao7v7og.mongodb.net/catwaysDB?retryWrites=true&w=majority";


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("MongoDB connecté");

    const reservationsData = JSON.parse(fs.readFileSync("Data/reservations.json", "utf-8"));

    await Reservation.deleteMany({}); // vide la collection si nécessaire

    // Récupérer tous les catways existants
    const catways = await Catway.find();
    const catwayMap = new Map(catways.map(c => [c.catwayNumber, c._id]));

    const reservationsToInsert = reservationsData
      .map(r => {
        const catwayId = catwayMap.get(r.catwayNumber);
        if (!catwayId) {
          console.warn(`Catway number ${r.catwayNumber} non trouvé, réservation ignorée`);
          return null;
        }
        return {
          catwayId,
          clientName: r.clientName,
          boatName: r.boatName,
          startDate: r.startDate,
          endDate: r.endDate
        };
      })
      .filter(r => r !== null);

    // Insérer toutes les réservations en une seule requête
    await Reservation.insertMany(reservationsToInsert);

    console.log(`${reservationsToInsert.length} réservations importées avec succès !`);
    process.exit();
  })
  .catch(err => console.error(err));

