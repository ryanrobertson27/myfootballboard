const Square = require('../models/squareModel');
const User = require('../models/userModel');

// GET all squares
const getAllSquares = async (req, res) => {
  const squares = await Square.find({});
  if (!squares) {
    return res.status(400).json({ message: 'no squares found' });
  }
  return res.status(200).json(squares);
};

const updateSquares = async (req, res) => {
  const { name, ids } = req.body;

  console.log(name, ids);
  res.status(200).send('complete');
};

// Initial seed of squares
const populateSquares = async (req, res) => {
  for (let i = 0; i < 100; i++) {
    const square = new Square({
      owner: null,
      position: i + 1,
      totalWins: 0,
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
  // updateSquareById,
  updateSquares,
};
