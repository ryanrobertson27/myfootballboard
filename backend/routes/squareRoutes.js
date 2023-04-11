const express = require('express');
const Square = require('../models/squareModel');
const squareController = require('../controllers/squareController');
const checkAuth = require('../checkAuth.js');

const router = express.Router();

router.get('/', squareController.getSquaresByBoardId);

router.get('/:boardId', squareController.getSquaresByBoardId)

router.get('/populate-squares', checkAuth, squareController.populateSquares);

router.get('/square/:squareId', checkAuth, squareController.getSquareByUserId)

router.patch('/update', checkAuth, checkAuth, squareController.updateSquares);

router.patch('/update-owner', checkAuth, checkAuth, squareController.updateSquareOwner);

module.exports = router;
 