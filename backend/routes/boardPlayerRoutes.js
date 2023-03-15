const express = require('express');
const boardPlayerController = require('../controllers/boardPlayerController');

const router = express.Router();

router.get('/:boardId', boardPlayerController.getBoardPlayersByBoardId);

router.post('/new-player', boardPlayerController.createNewBoardPlayer);

router.delete('/:playerId', boardPlayerController.deleteBoardPlayerById);

module.exports = router;