const express = require('express');

const gameController = require('../controllers/gameController');

const router = express.Router();

router.get('/generateGame/:boardId', gameController.generateGame);

module.exports = router;