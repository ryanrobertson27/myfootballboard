const express = require('express');
const Square = require('../models/squareModel');
const squareController = require('../controllers/squareController');

const router = express.Router();

router.get('/', squareController.getAllSquares);

// router.put('/:id', squareController.updateSquareById);

router.patch('/update', squareController.updateSquares);

router.get('/populate-squares', squareController.populateSquares);

module.exports = router;
