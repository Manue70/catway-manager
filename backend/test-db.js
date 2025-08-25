
// backend/test-db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;

mongoose.connect(uri)
  .then(() => {
    console.log('✅ Connexion à MongoDB réussie !');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Erreur de connexion à MongoDB :', err);
    process.exit(1);
  });
