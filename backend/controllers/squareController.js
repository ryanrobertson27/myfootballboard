const Square = require('../models/squareModel');
const User = require('../models/userModel');

// GET all squares squares/
const getAllSquares = async (req, res) => {
  const squares = await Square.find({}).populate({
    path: 'owner',
    select: 'name',
  });
  if (!squares) {
    return res.status(400).json({ message: 'no squares found' });
  }
  return res.status(200).json(squares);
};

// squares/update
const updateSquares = async (req, res) => {
  const { name, ids } = req.body;

  console.log(name, ids);
  res.status(200).send('complete');
};

// squares/update-owner
const updateSquareOwner = async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) {
      return res.status(400).json({ message: 'No User found' });
    }

    const square = await Square.findByIdAndUpdate(req.body.id, {
      owner: user._id,
    });
    if (!square) {
      return res.status(400).json({ message: 'No Square Found' });
    }
    return res.status(200).json(square);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};
// squares/populate-squares
const populateSquares = async (req, res) => {
  for (let i = 0; i < 100; i++) {
    const square = new Square({
      position: i + 1,
      wins: 0,
      owner: null,
    });
    square.save((err) => {
      if (err) return 'err';
    });
  }
  res.status(200).send('success');
};

module.exports = {
  getAllSquares,
  populateSquares,
  updateSquareOwner,
  updateSquares,
};
