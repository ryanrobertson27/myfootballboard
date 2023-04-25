const Board = require('../models/boardModel');
const User = require('../models/userModel');
const Square = require('../models/squareModel');
const BoardPlayer = require('../models/boardPlayerModel');
const Game = require('../models/gameModel');

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

const deleteBoardById = async (req, res) => {
  try {
    const { boardId } = req.params;


    const board = await Board.findByIdAndDelete(boardId);
    if (!board) {
      return res.status(400).send('Could not find board');
    }

    const boardPlayers = await BoardPlayer.deleteMany({ board: boardId });
    if (!boardPlayers) {
      return res.status(400).send('Could not find board players');
    }
    
    const squares = await Square.deleteMany({ board: boardId });
    if (!squares) {
      return res.status(400).send('Could not find squares');
    }

    const user = await User.findById(board.owner);
    if (!user) {
      return res.status(400).send('Could not find user');
    }

    user.boards = user.boards.filter((board) => board.toString() !== boardId);
    await user.save();

    return res.status(200).json(board);

  } catch(error) {
    console.log(error);
    return res.status(400).json(error);
  }
}

const fillBoardWithRandomPlayers = async (req, res) => {
  try {
    const { boardId } = req.body;

    const board = await Board.findById(boardId)

    if(board.state === 'published') {
      return res.status(400).json({message: 'Cannot fill board with players on a published board'})
    }

    const squares = await Square.find({board: boardId})

    if(!squares) {
      throw new Error('could not find board')
    }

    for await (let square of squares)  {
      if(square.owner) {
        continue;
      }
      const player = await BoardPlayer.create({
        board: boardId,
        first: 'John',
        last: 'Doe',
        email: 'email@example.com',
        venmo: 'john-doe',
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

    const board = await Board.findById(boardId)

    if(board.state === 'published') {
      return res.status(400).json({message: 'Cannot clear board players on a published board'})
    }


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

const updateBoardById = async (req, res) => {
  try {
    const { boardId } = req.params;
    const { boardName, costPerSquare, homeTeam, awayTeam } = req.body;

    const board = await Board.updateOne({ _id: boardId }, { boardName, costPerSquare, homeTeam, awayTeam });

    if (!board) {
      return res.status(400).send('Could not find board');
    }

    return res.status(200).json(board);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  };
}

const publishBoardById = async (req, res) => {
  try {
    const { boardId } = req.params;

    const squares = await Square.find({ board: boardId });

    if (!squares) {
      return res.status(400).send('Could not find squares');
    }

    const nullSquaresFound = squares.filter(square => square.owner === null)


    if (nullSquaresFound.length > 0) {
      return res.status(400).send('All board squares must be filled before publishing.  Please ensure all squares have a player assigned.');
    }

    const filter = { _id: boardId };
    const update = { boardState: 'PUBLISHED' };

    const board = await Board.updateOne(filter, update);

    if (!board) {
      return res.status(400).send('Could not find board');
    }



    return res.status(200).json(board);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  };
}

const randomizeGameNumbers = async (req, res) => {
  try {
    const { boardId } = req.params;

    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(400).send('Could not find board');
    }

    if (board.boardState === 'PUBLISHED') {
      return res.status(400).send('Board is already published');
    };

    // Fisher Yates Shuffle Algorithm
    const shuffle = (array) => {
      let endOfArrayIndex = array.length
      let element;
      let randomIndex;
      
      while (endOfArrayIndex) {
        randomIndex = Math.floor(Math.random() * endOfArrayIndex--)
        
        element = array[endOfArrayIndex]
        array[endOfArrayIndex] = array[randomIndex]
        array[randomIndex] = element;
      }
      
      return array
    }

    board.homeNumbers = await shuffle(board.homeNumbers)
    board.awayNumbers = await shuffle(board.awayNumbers)

    board.save()

    return res.status(200).json(board)

  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}

const updateBoardWithGameData = async (req, res) => {
  try {
    const { boardId, gameId } = req.body;

    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(400).send('Could not find board');
    }
    
    const updateBoardWithData = setInterval(async () => {

      const game = await Game.findById(gameId);
      
      if (!gameId) {
        return res.status(400).send('Could not find game');
      }

      //check null so it doesn't run multiple times
      // TODO refactor to make it more DRY
      if (game.firstQuarter.completed && board.quarterWinners[0] === null) {
        // get last digit of number for each team and convert to string
        const homeLastNumber = board.homeNumbers.indexOf(game.firstQuarter.homeScore % 10).toString();
        const awayLastNumber = board.awayNumbers.indexOf(game.firstQuarter.awayScore % 10).toString();
        // combine strings to get winning square and convert to number
        const winningSquareNumber = Number(awayLastNumber + homeLastNumber);
        // find winning square and populate owner
        const winningSquare = await Square.findOne({position: winningSquareNumber - 1, board: boardId})
        const winningPlayer = await BoardPlayer.findById(winningSquare.owner)
        // set winning player to quarter winner
        board.quarterWinners[0] = winningPlayer;
      }
      if (game.secondQuarter.completed && board.quarterWinners[1] === null) {
        // add first and second quarter scores to get total
        const secondQuarterHomeTotal = game.firstQuarter.homeScore + game.secondQuarter.homeScore;
        const secondQuarterAwayTotal = game.firstQuarter.awayScore + game.secondQuarter.awayScore;
        const homeLastNumber = board.homeNumbers.indexOf(secondQuarterHomeTotal % 10).toString();
        const awayLastNumber = board.awayNumbers.indexOf(secondQuarterAwayTotal % 10).toString();
        const winningSquareNumber = Number(awayLastNumber + homeLastNumber);
        const winningSquare = await Square.findOne({position: winningSquareNumber - 1, board: boardId})
        const winningPlayer = await BoardPlayer.findById(winningSquare.owner)
        board.quarterWinners[1] = winningPlayer;
      }
      if (game.thirdQuarter.completed && board.quarterWinners[2] === null) {
        // add first, second, and third quarter scores to get total
        const thirdQuarterHomeTotal = game.firstQuarter.homeScore + game.secondQuarter.homeScore + game.thirdQuarter.homeScore;
        const thirdQuarterAwayTotal = game.firstQuarter.awayScore + game.secondQuarter.awayScore + game.thirdQuarter.awayScore;
        const homeLastNumber = board.homeNumbers.indexOf(thirdQuarterHomeTotal % 10).toString();
        const awayLastNumber = board.awayNumbers.indexOf(thirdQuarterAwayTotal % 10).toString();
        const winningSquareNumber = Number(awayLastNumber + homeLastNumber);
        const winningSquare = await Square.findOne({position: winningSquareNumber - 1, board: boardId})
        const winningPlayer = await BoardPlayer.findById(winningSquare.owner)
        board.quarterWinners[2] = winningPlayer;
      }
      if (game.fourthQuarter.completed && board.quarterWinners[3] === null) {
        // add first, second, third, and fourth quarter scores to get total
        const fourthQuarterHomeTotal = game.firstQuarter.homeScore + game.secondQuarter.homeScore + game.thirdQuarter.homeScore + game.fourthQuarter.homeScore;
        const fourthQuarterAwayTotal = game.firstQuarter.awayScore + game.secondQuarter.awayScore + game.thirdQuarter.awayScore + game.fourthQuarter.awayScore;
        const homeLastNumber = board.homeNumbers.indexOf(fourthQuarterHomeTotal % 10).toString();
        const awayLastNumber = board.awayNumbers.indexOf(fourthQuarterAwayTotal % 10).toString();
        const winningSquareNumber = Number(awayLastNumber + homeLastNumber);
        const winningSquare = await Square.findOne({position: winningSquareNumber - 1, board: boardId})
        const winningPlayer = await BoardPlayer.findById(winningSquare.owner)
        board.quarterWinners[3] = winningPlayer;
      }

      if (game.firstQuarter.completed && game.secondQuarter.completed && game.thirdQuarter.completed && game.fourthQuarter.completed) {
        clearInterval(updateBoardWithData);
      } 
      board.save()
    }, 1000); // 10 seconds
    return res.status(200).send('success');
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}

const getBoardWinners = async (req, res) => {
  try {
    const { boardId } = req.params;

    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(400).send('Could not find board');
    }

    return res.status(200).json(board.quarterWinners);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}




module.exports = {
  createNewBoard,
  getBoardById,
  deleteBoardById,
  updateBoardById,
  fillBoardWithRandomPlayers,
  clearAllBoardPlayers,
  publishBoardById,
  randomizeGameNumbers,
  updateBoardWithGameData,
  getBoardWinners,
};


