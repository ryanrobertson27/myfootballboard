const express = require('express');

const gameController = require('../controllers/gameController');
const checkAuth = require('../checkAuth.js');

const router = express.Router();

router.get('/generate-game/:boardId', checkAuth, gameController.generateGame);

router.get('/:gameId', gameController.getGameById);

router.delete('/reset-game/:boardId', gameController.resetGameForBoard);

module.exports = router;