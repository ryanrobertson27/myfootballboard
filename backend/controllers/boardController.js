const Board = require('../models/boardModel');
const User = require('../models/userModel');
const Square = require('../models/squareModel');
const BoardPlayer = require('../models/boardPlayerModel');
const Game = require('../models/gameModel');

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

// const getGameData = async (req, res) => {
//   try {
//     const { boardId, gameId } = req.params;

//     const board = await Board.findById(boardId);

//     if (!board) {
//       return res.status(400).send('Could not find board');
//     }

//     const game = Game.findById(gameId);

//     if (!game) {
//       return res.status(400).send('Could not find game');
//     }

//     const setIntervalFunction = async (callback, delay) => {
      
//       const interval = setInterval(() => {
//         callback();
//         if(game.completed === true) {
//           clearInterval(interval);
//         }
//       }, delay);
//     }

//     setIntervalFunction(() => {
//       // TODO write logic to get game data and update board
//       // 
//       console.log(game);
//     }, 10000); // 10 seconds

//   } catch(error) {
//     console.log(error);
//     return res.status(400).json(error);
//   }
// }

const fillBoardWithRandomPlayers = async (req, res) => {
  try {
    const { boardId } = req.body;

    const squares = await Square.find({board: boardId})

    if(!squares) {
      throw new Error('could not find board')
    }

    console.log(typeof(squares))

    for await (let square of squares)  {
      console.log('hello')
      if(square.owner) {
        continue;
      }
      const player = await BoardPlayer.create({
        board: boardId,
        first: 'first',
        last: 'last',
        email: 'email@example.com',
        venmo: 'venmo',
        phone: '123-456-7890',
        squares: [square._id],
      })

      square.owner = player._id;
      await square.save();
    }

    return res.status(200).json(squares)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const clearAllBoardPlayers = async (req, res) => {
  try {
    const { boardId } = req.body;

    const squares = await Square.find({board: boardId})

    squares.forEach(async (square) => {
      square.owner = null;
      await square.save()
    })

    const players = await BoardPlayer.find({board: boardId})

    players.forEach(async (player) => {
      await player.delete()
    })

    return res.status(200).json({message: 'success'})
  } catch (error) {
    return res.status(400).json(error)
  }
}

module.exports = { getAllBoards, createNewBoard, getBoardById, fillBoardWithRandomPlayers, clearAllBoardPlayers };
