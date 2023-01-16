const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const userRouter = require('./routes/userRoutes');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "not my cat's name",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);
app.use(passport.initialize());
app.use(passport.session()); // checking if user is in session

// routes
app.use('/user', userRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(
    app.listen(PORT, (err) => {
      if (err) console.log(`Error setting up server: ${err}`);
      console.log(`Server is running on port ${PORT}`);
    })
  )
  .catch((error) => console.log(error));
