import express from 'express';
import router from './router/router.js';
import dotenv from 'dotenv';
import session from 'express-session';

dotenv.config();

const app = express();

// body parser

app.use(express.json()); 

app.use(
    session({
        secret: process.env.SECRET_WORD,
        resave: false,
        saveUninitialized:false,
        cookie:{
            maxAge:1000 * 60 * 60 * 24, // 1 jours
            secure: false, // true en prod
        },
    })
);

// Utilisation du router
app.use(router);

export default app;