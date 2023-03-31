const express = require('express');
const boardController = require('../controllers/boardController');

const router = express.Router();

router.post('/new-board', boardController.createNewBoard);

router.get('/:boardId', boardController.getBoardById);

//TODO add boardID to path and change to params in controller
router.post('/fill-board', boardController.fillBoardWithRandomPlayers);

//TODO add boardID to path and change to params in controller
router.post('/clear-board', boardController.clearAllBoardPlayers);

router.delete('/:boardId', boardController.deleteBoardById);

router.patch('/:boardId/update-board', boardController.updateBoardById);

router.patch('/:boardId/publish-board', boardController.publishBoardById);

router.patch('/:boardId/randomize-game-numbers', boardController.randomizeGameNumbers);

module.exports = router;
