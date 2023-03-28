const Game = require('../models/gameModel')
const Board = require('../models/boardModel')

const generateGame = async (req, res) => {
  const { boardId } = req.params

  const game = await Game.create({
    board: boardId,
    awayTeamName: 'Away Team',
    homeTeamName: 'Home Team',
    timeRemaining: 3600,
  })

  if (!game) {
    throw new Error('error creating game')
  }

  const setIntervalGameFunction = async (callback, delay, total) => {
    var x = 0;

    var intervalID = setInterval(function () {
      callback();
      if (++x === total) {
        clearInterval(intervalID);
      }
    }, delay);
  }

  setIntervalGameFunction(() => {


    const randomNumber = Math.floor(Math.random() * 80) + 1

    game.timeRemaining -= 15;

    // need to refactor this to be more maintainable
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
    game.markModified('firstQuarter')
    game.markModified('secondQuarter')
    game.markModified('thirdQuarter')
    game.markModified('fourthQuarter')
    game.save()

  }, 1000, 240 ) // 240 seconds = 4 minutes
    
  return res.status(200).json(game)
}

const getGameById = async (req, res) => {
  try {

    const { gameId } = req.params
  
    const game = await Game.findById(gameId)
  
    if(!game) {
      throw new Error('game not found')
    }
  
    return res.status(200).json(game)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = {
  generateGame,
  getGameById
}

