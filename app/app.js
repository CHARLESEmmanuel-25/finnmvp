import express from 'express';
import router from './router/router.js';
import dotenv from 'dotenv';


const app = express();

// body parser

app.use(express.json()); 


// Utilisation du router
app.use(router);

export default app;