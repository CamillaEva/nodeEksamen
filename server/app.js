// ----- Imports -----
import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import http from "http";
import { Socket } from "socket.io";
import { Server } from "socket.io";


// ----- Express -----

const app = express();

app.use(express.json());

// ----- Session -----

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    sameSite: "lax"
  }
});

app.use(sessionMiddleware);


// ----- cors -----

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


// ----- HTTP Server -----

const server = http.createServer(app);


// ----- Socket.IO -----

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  }
});

io.engine.use(sessionMiddleware);

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("motivation-message", (message) => {
    socket.broadcast.emit("receive-message", message);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});


// ----- Routers -----

import loginRouter from './routers/loginRouter.js';
app.use(loginRouter);

import pageRouter from './routers/pageRouter.js';
app.use(pageRouter);

import weightRouter from './routers/weightRouter.js';
app.use(weightRouter);

import calorieRouter from './routers/calorieRouter.js';
app.use(calorieRouter);

// ----- Listen -----

const PORT = process.env.PORT ?? 8080;

server.listen(PORT, () => console.log("server running on port", PORT));