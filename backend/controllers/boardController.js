const Board = require('../models/boardModel');
const User = require('../models/userModel');
const Square = require('../models/squareModel');
const BoardPlayer = require('../models/boardPlayerModel');

const getAllBoards = async (req, res) => {
  res.status(200).send('success');
};

// TODO protect this route
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

    owner.boards.push(board._id)
    await owner.save()

    //generate squares
    for (let i = 0; i < 100; i++) {
      const square = await Square.create({
        board: board._id,
        owner: null,
        position: i + 1,
        wins: 0,
      });
    }
  
    return res.status(200).json(board);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

// TODO protect this route
const getBoardById = async (req, res) => {
  try {
    const { boardId } = req.params;

    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(400).send('Could not find board');
    }

    return res.status(200).json(board);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

// TODO protect this route
const deleteBoardById = async (req, res) => {
  try {
    const { boardId } = req.params;

    const board = await Board.findByIdAndDelete(boardId);

    if (!board) {
      return res.status(400).send('Could not find board');
    }

    const boardPlayers = BoardPlayer.find({ board: boardId });
    

    return res.status(200).json(board);

  } catch(error) {
    console.log(error);
    return res.status(400).json(error);
  }
}


module.exports = { getAllBoards, createNewBoard, getBoardById };
