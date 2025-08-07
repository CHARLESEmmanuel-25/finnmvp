import 'dotenv/config';
import app from './app/app.js';
import { createServer } from 'node:http';
import { exec } from 'child_process';


// Création du serveur HTTP avec Express
const server = createServer(app);
const PORT = process.env.PORT || 3000;

exec('python3 get_quotes.py', (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Erreur lancement WebSocket Python : ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`⚠️ STDERR Python : ${stderr}`);
    return;
  }
  console.log(`📦 WebSocket Python lancé :\n${stdout}`);
});


// Lancement du serveur
server.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
