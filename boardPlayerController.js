const BoardPlayer = require('./backend/models/boardPlayerModel');
const Square = require('./backend/models/squareModel')
const Board = require('./backend/models/boardModel')

// TODO protect this route
const createNewBoardPlayer = async (req, res) => {
  try {
    const { squares, boardId, first, last, email, venmo, phone } = req.body;

    let squaresToAdd = squares.map((square) => square._id)

    const boardPlayer = await BoardPlayer.create({
      board: boardId,
      first,
      last,
      email,
      venmo,
      phone,
      squares: squaresToAdd,
    });

    if (!boardPlayer) {
      throw new Error('error creating board')
    }

    // TODO add array of square ids to player, and player id to square
    await squaresToAdd.forEach((square) => {
      Square.findByIdAndUpdate(square, {owner: boardPlayer._id}).exec()
    })

    return res.status(200).json(squaresToAdd);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);

  }
};

// TODO protect this route
const getBoardPlayersByBoardId = async (req, res) => {
  try {

    const { boardId } = req.params
  
    const players = await BoardPlayer.find({board: boardId})
  
    if(!players) {
      throw new Error('no players found')
    }

    return res.status(200).json(players)

  } catch (error) {
    return res.status(401).json(error)
  }
}

//TODO protect this route
const deleteBoardPlayerById = async (req, res) => {
  try {
    const { playerId } = req.params;

    const player = await BoardPlayer.findByIdAndDelete(playerId)
    
    const square = await Square.updateMany({owner: playerId}, {owner: null})

    res.status(200).json({message: 'player deleted'})
  } catch (error) {
    res.status(400).json(error)
  }
}

const fillBoardWithRandomPlayers = async (req, res) => {
  try {
    const { boardId } = req.params;

    const squares = Square.find({board: boardId}).exec()

    if(!board) {
      throw new Error('could not find board')
    }

    return res.status(200).json(squares)
  } catch (error) {
    return res.status(400).json(error)
  }
}



module.exports = { createNewBoardPlayer, getBoardPlayersByBoardId, deleteBoardPlayerById, }