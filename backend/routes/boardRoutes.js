const express = require('express');
const boardController = require('../controllers/boardController');
const checkAuth = require('../checkAuth.js');

const router = express.Router();

router.get('/:boardId', boardController.getBoardById);

router.post('/new-board', checkAuth, boardController.createNewBoard);

router.post('/fill-board', checkAuth, boardController.fillBoardWithRandomPlayers);

router.post('/clear-board', checkAuth, boardController.clearAllBoardPlayers);

router.post('/update-board-with-game-data', checkAuth, boardController.updateBoardWithGameData);

router.patch('/:boardId/update-board', checkAuth, boardController.updateBoardById);

router.patch('/:boardId/publish-board', checkAuth, boardController.publishBoardById);

router.patch('/:boardId/randomize-game-numbers', checkAuth, boardController.randomizeGameNumbers);

router.delete('/:boardId', checkAuth, boardController.deleteBoardById);

module.exports = router;
