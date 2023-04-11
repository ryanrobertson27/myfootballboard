const express = require('express');
const boardPlayerController = require('../controllers/boardPlayerController');
const checkAuth = require('../checkAuth.js');

const router = express.Router();

router.get('/:boardId', checkAuth, boardPlayerController.getBoardPlayersByBoardId);

router.post('/new-player', checkAuth, boardPlayerController.createNewBoardPlayer);

router.delete('/:playerId', checkAuth, boardPlayerController.deleteBoardPlayerById);

module.exports = router;