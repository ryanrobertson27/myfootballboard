const mongoose = require('mongoose');
const Square = require('./squareModel');
const Winner = require('./winnerSchema');

const { Schema } = mongoose;

const boardSchema = new Schema({
  boardName: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  venmo: {type: String, default: null},
  costPerSquare: Number,
  awayTeam: String,
  homeTeam: String,
  homeNumbers: {type: Array, default: [1,2,3,4,5,6,7,8,9,0]},
  awayNumbers: {type: Array, default: [1,2,3,4,5,6,7,8,9,0]},
  // unpublished, published, closed
  state: { type: String, default: 'unpublished'},
});

const Board = mongoose.model('Board', boardSchema);
module.exports = Board;
