import 'dotenv/config';
import express from 'express';

const app = express();

import cors from 'cors';

import session from 'express-session';


app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}
));
 


// ----- Routers -----

import loginRouter from './routers/loginRouter.js';
app.use(loginRouter);

import pageRouter from './routers/pageRouter.js';
app.use(pageRouter)


// ----- Listen -----

const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => console.log("server running on port", PORT));