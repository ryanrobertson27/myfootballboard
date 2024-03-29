const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const uri = process.env.NODE_ENV === 'production' ? process.env.MONGO_URI : 'mongodb://127.0.0.1:27017/fourthandcold';

const userRouter = require('./routes/userRoutes');
const squareRouter = require('./routes/squareRoutes');
const boardRouter = require('./routes/boardRoutes');
const boardPlayerRoutes = require('./routes/boardPlayerRoutes');
const gameRouter = require('./routes/gameRoutes');


require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/squares', squareRouter);
app.use('/boards', boardRouter);
app.use('/users', userRouter);
app.use('/players', boardPlayerRoutes);
app.use('/games', gameRouter);


mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    app.listen(PORT, (err) => {
      if (err) console.log(`Error setting up server: ${err}`);
      console.log(`Server is running on port ${PORT}`);
    })
  )
  .catch((error) => console.log(error));
