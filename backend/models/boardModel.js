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
  // what should i store here? the squares? or the boardPlayers?
  quarterWinners: {type: Array, default: [null, null, null, null]},
  homeNumbers: {type: Array, default: [1,2,3,4,5,6,7,8,9,0]},
  awayNumbers: {type: Array, default: [1,2,3,4,5,6,7,8,9,0]},
  // not sure im doing these enums right
  gameStatus: { type: String, enum: ['NOT_STARTED', 'ACTIVE', 'FINISHED'], default: 'NOT_STARTED'},
  boardState: { type: String, enum: ['UNPUBLISHED', 'PUBLISHED', 'ARCHIVED'], default: 'UNPUBLISHED'},
});

const Board = mongoose.model('Board', boardSchema);
module.exports = Board;

