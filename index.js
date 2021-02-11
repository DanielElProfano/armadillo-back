const express = require('express');
const path = require('path');
const passport = require('passport');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const userRouter = require('./routes/user.routes');

require('dotenv').config();

const db = require('./db.js');
db.connect();

require('./passport');

const PORT = process.env.PORT || 5000;

const server = express();

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

server.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(express.static(path.join(__dirname, 'public')))

server.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 360000,
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

server.use(passport.initialize());

server.use(passport.session());

server.use("/auth", userRouter);

server.use('*', (req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
})

server.use((err, req, res, next) => {
  console.log(err);
  return res.status(err.status || 500).json(err);
});

server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
