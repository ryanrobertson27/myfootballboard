const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRouter = require('./routes/userRoutes');
const squareRouter = require('./routes/squareRoutes');
const boardRouter = require('./routes/boardRoutes');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/users', userRouter);
app.use('/squares', squareRouter);
app.use('/boards', boardRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(
    app.listen(PORT, (err) => {
      if (err) console.log(`Error setting up server: ${err}`);
      console.log(`Server is running on port ${PORT}`);
    })
  )
  .catch((error) => console.log(error));
