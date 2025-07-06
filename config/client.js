import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pg;

const client = new Client({
  user: process.env.DBU,
  host: process.env.HOST,
  database: process.env.DBN,
  password: process.env.DBP,
  port: process.env.DBPORT,
 
});

// Connexion à la base de données avec gestion des erreurs
client.connect()
  .then(() => console.log("connexion à la base de données"))
  .catch(err => console.error("Erreur de connexion à la base de données", err));

export default client;