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


// TODO protect this route
const getSquaresByBoardId = async (req, res) => {
  try {
    const {boardId} = req.params
  
    const squares = await Square.find({board: boardId }).populate('owner')
  
    if(!squares) {
      throw new Error('no squares found')
    }
    
    return res.status(200).json(squares)
  } catch (error) {
    return res.status(400).json(error)
  }
}


// TODO protect this route
// squares/update
const updateSquares = async (req, res) => {
  const { name, ids } = req.body;
  res.status(200).send('complete');
};

//TODO protect this route
// squares/update-owner
const updateSquareOwner = async (req, res) => {
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

// TODO protect this route
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

// TODO protect this route
const getSquareByUserId = async (req, res) => {
  try {
    const { userId } = req.params

    const square = Square.find({owner: userId})

    if(!square) {
      throw new Error('no square found')
    }

    return res.status(200).json(square)
  } catch (error) {
    return res.status(400).json(error)
  }
}

module.exports = {
  getAllSquares,
  populateSquares,
  updateSquareOwner,
  updateSquares,
  getSquaresByBoardId,
  getSquareByUserId,
};
