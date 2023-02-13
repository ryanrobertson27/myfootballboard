const Board = require('../models/boardModel');
const User = require('../models/userModel');

const getAllBoards = async (req, res) => {
  res.status(200).send('success');
};

const createNewBoard = async (req, res) => {
  try {
    const { id, name, amount, home, away } = req.body;

    const owner = await User.findById(id).exec();
    if (!owner) {
      throw new Error('Could not find user');
    }

    const board = await Board.create({
      boardName: name,
      owner: owner._id,
      costPerSquare: amount,
      homeTeam: home,
      awayTeam: away,
    });

    if (!board) {
      throw new Error('Error Creating Board');
    }

    return res.status(200).json(board);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

module.exports = { getAllBoards, createNewBoard };
