const Board = require('../models/boardModel');
const User = require('../models/userModel');

const getAllBoards = async (req, res) => {
  res.status(200).send('success');
};

const createNewBoard = async (req, res) => {
  try {
    const { email, boardName, costPerSquare, homeTeam, awayTeam } = req.body;

    const owner = await User.findOne({ email }).exec();
    if (!owner) {
      // throw new Error('Could not find user');
      return res.status(400).send('Could not find user');
    }

    const board = await Board.create({
      boardName,
      owner: owner._id,
      costPerSquare,
      homeTeam,
      awayTeam,
    });

    if (!board) {
      return res.status(400).send('Error Creating Board');
      // throw new Error('Error Creating Board');
    }

    const user = await User.findByIdAndUpdate(owner._id, {
      $push: { boards: board._id },
    }).exec();

    if (!user) {
      return res.status(400).send('Error Updating User');
      // throw new Error('Error Updating User');
    }

    return res.status(200).json(board);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const getBoard = async (req, res) => {
  try {
    const { boardId } = req.params;

    const board = await Board.findById(boardId).exec();

    if (!board) {
      return res.status(400).send('Could not find board');
    }

    return res.status(200).json(board);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

module.exports = { getAllBoards, createNewBoard, getBoard };
