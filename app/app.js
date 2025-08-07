import express from 'express';
import router from './router/router.js';
import dotenv from 'dotenv';
import session from 'express-session';


dotenv.config();

const app = express();

// Body parser
app.use(express.json()); 

// Sessions
app.use(
  session({
    secret: process.env.SECRET_WORD,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 jour
      secure: false // à mettre à true en production avec HTTPS
    }
  })
);

// Routes
app.use(router);


export default app;
