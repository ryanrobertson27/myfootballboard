const Game = require('../models/gameModel')
const Board = require('../models/boardModel')

const generateGame = async (req, res) => {
  const { boardId } = req.params

  const board = await Board.findById(boardId)
  if (!board) {
    return res.status(400).json({message: 'Could not find board'})
  }

  const gameAlreadyExists = await Game.find({ board: boardId }) 
  if (gameAlreadyExists.length > 0) {
    return res.status(400).json({message: 'A game for this board already exists'})
  }

  const newGame = await Game.create({
    board: boardId,
    awayTeamName: board.awayTeam,
    homeTeamName: board.homeTeam,
    timeRemaining: 3600,
    state: 'ACTIVE'
  })

  if (!newGame) {
    throw new Error('error creating game')
  }

  let counter = 0;
  let timeOut;

  // setTimeout is called recursively until counter reaches 240
  const setTimeoutGameFunction = function(){
    timeOut = setTimeout(async function() {


      counter++;

      console.time('setIntervalGameFunction')

      const game = await Game.findById(newGame._id)

      const randomNumber = Math.floor(Math.random() * 80) + 1
      //using 80 because it gives the most realistic score in the time frame

      game.timeRemaining -= 15;
      
      if (game.timeRemaining < 2700) {
        game.firstQuarter.completed = true
        game.currentQuarter = 2
      }
      if (game.timeRemaining < 1800) {
        game.secondQuarter.completed = true
        game.currentQuarter = 3
      }
      if (game.timeRemaining < 900) {
        game.thirdQuarter.completed = true
        game.currentQuarter = 4
      } 
      if (game.timeRemaining <= 0) {
        game.fourthQuarter.completed = true
        game.state = 'FINISHED'
      }

      // adds points to the game based on the random number
      // TODO - refactor to make more DRY
      switch (randomNumber) {
        case 1:
          game.awayTeamScore += 3
          if(game.timeRemaining > 2700) {
            game.firstQuarter.awayScore += 3
          } else if (game.timeRemaining > 1800) {
            game.secondQuarter.awayScore += 3
          } else if (game.timeRemaining > 900) {
            game.thirdQuarter.awayScore += 3
          } else if (game.timeRemaining > 0) {
            game.fourthQuarter.awayScore += 3
          }
          break;
        case 2:
          game.homeTeamScore += 3
          if(game.timeRemaining > 2700) {
            game.firstQuarter.homeScore += 3
          } else if (game.timeRemaining > 1800) {
            game.secondQuarter.homeScore += 3
          } else if (game.timeRemaining > 900) {
            game.thirdQuarter.homeScore += 3
          } else if (game.timeRemaining > 0) {
            game.fourthQuarter.homeScore += 3
          }
          break;
        case 3:
          game.awayTeamScore += 7
          if(game.timeRemaining > 2700) {
            game.firstQuarter.awayScore += 7
          } else if (game.timeRemaining > 1800) {
            game.secondQuarter.awayScore += 7
          } else if (game.timeRemaining > 900) {
            game.thirdQuarter.awayScore += 7
          } else if (game.timeRemaining > 0) {
            game.fourthQuarter.awayScore += 7
          }
          break;
        case 4:
          game.homeTeamScore += 7
          if(game.timeRemaining > 2700) {
            game.firstQuarter.homeScore += 7
          } else if (game.timeRemaining > 1800) {
            game.secondQuarter.homeScore += 7
          } else if (game.timeRemaining > 900) {
            game.thirdQuarter.homeScore += 7
          } else if (game.timeRemaining > 0) {
            game.fourthQuarter.homeScore += 7
          }
          break;
        default:
          break;
      }
      // need to call markModified because of the mixed type in the schema
      game.markModified('firstQuarter')
      game.markModified('secondQuarter')
      game.markModified('thirdQuarter')
      game.markModified('fourthQuarter')
      game.save()
      console.timeEnd('setIntervalGameFunction')
      


      if (counter < 240) {
        setTimeoutGameFunction();
      } else {
        clearTimeout(timeOut);
      }
    }, 1000)    
  }

  setTimeoutGameFunction();

  return res.status(200).json({gameId: newGame._id})
}

const getGameById = async (req, res) => {
  try {
    const { gameId } = req.params

    const game = await Game.findById(gameId)
    if (!game) {
      return res.status(400).json({message: 'Could not find game'})
    }

    return res.status(200).json(game)

  } catch (error) {
    console.log(error)
  }
}

const getGameByBoardId = async (req, res) => {
  try {
    const { boardId } = req.params

    const game = await Game.findOne({ board: boardId })

    if (!game) {
      return res.status(400).json({message: 'Could not find game in getGameByBoardId'})
    }

    return res.status(200).json(game)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

const resetGameForBoard = async (req, res) => {
  try {
    const { boardId } = req.params;

    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(400).json({message: 'Could not find board'});
    }

    board.quarterWinners = [null, null, null, null];

    board.save()

    await Game.deleteOne( { board: boardId } );

    return res.status(200).json({message: 'success'})
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}



module.exports = {
  generateGame,
  getGameById,
  getGameByBoardId,
  resetGameForBoard,
}



