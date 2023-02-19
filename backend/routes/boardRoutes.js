const express = require('express');
const boardController = require('../controllers/boardController');

const router = express.Router();

router.get('/', boardController.getAllBoards);

router.post('/new-board', boardController.createNewBoard);

router.get('/:boardId', boardController.getBoard);

module.exports = router;
