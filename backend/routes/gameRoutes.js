const express = require('express');

const gameController = require('../controllers/gameController');

const router = express.Router();

router.get('/generate-game/:boardId', gameController.generateGame);

router.get('/:gameId', gameController.getGameById);

module.exports = router;