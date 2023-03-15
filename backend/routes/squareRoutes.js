const express = require('express');
const Square = require('../models/squareModel');
const squareController = require('../controllers/squareController');

const router = express.Router();

router.get('/', squareController.getSquaresByBoardId);

// TODO get squares by user id


router.get('/:boardId', squareController.getSquaresByBoardId)

router.patch('/update', squareController.updateSquares);

router.get('/populate-squares', squareController.populateSquares);

router.patch('/update-owner', squareController.updateSquareOwner);

router.get('/square/:squareId', squareController.getSquareByUserId)


module.exports = router;
 