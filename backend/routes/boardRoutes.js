const express = require('express');
const boardController = require('../controllers/boardController');

const router = express.Router();

router.get('/', boardController.getAllBoards);

router.post('/new-board', boardController.createNewBoard);

router.get('/:boardId', boardController.getBoardById);

router.post('/fill-board', boardController.fillBoardWithRandomPlayers);

router.post('/clear-board', boardController.clearAllBoardPlayers);

router.delete('/:boardId', boardController.deleteBoardById);

module.exports = router;
