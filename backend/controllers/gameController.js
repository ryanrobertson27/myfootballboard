const Game = require('../models/gameModel')
const Board = require('../models/boardModel')

const generateGame = async (req, res) => {

  const { boardId } = req.params



  const game = await Game.create({
    board: boardId,
    awayTeam: 'Away Team',
    homeTeam: 'Home Team',
    awayScore: 0,
    homeScore: 0,
    firstQuarter: 0,
    secondQuarter: 0,
    thirdQuarter: 0,
    fourthQuarter: 0,
    timeRemaining: 900,
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
    }
      , delay);
  }
  
  setIntervalGameFunction(() => {
    console.log('game started')

    const randomNumber = Math.floor(Math.random() * 10) + 1

    game.timeRemaining -= 1;

    switch (randomNumber) {
      case 1:
        game.awayScore += 3
        break;
      case 2:
        game.homeScore += 3
        break;
      case 3:
        game.awayScore += 7
        break;
      case 4:
        game.homeScore += 7
        break;
      default:
        break;
    }
    game.save()


  }, 1000, 15)
    
}

module.exports = {
  generateGame
}

