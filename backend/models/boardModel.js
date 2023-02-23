const mongoose = require('mongoose');
const Square = require('./squareModel');
const Winner = require('./winnerSchema');

const { Schema } = mongoose;

const boardSchema = new Schema({
  boardName: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  squares: [],
  costPerSquare: Number,
  awayTeam: String,
  homeTeam: String,
  homeNumbers: [null, null, null, null, null, null, null, null, null, null],
  awayNumbers: [null, null, null, null, null, null, null, null, null, null],
  settings: {
    published: { type: Boolean, default: false },
    maxSquaresPerUser: { type: Number, default: 4 },
  },
});

boardSchema.pre('save', function (next) {
  if (!this.squares || this.squares.length === 0) {
    this.squares = [];
    for (let i = 0; i < 100; i++) {
      this.squares.push({ owner: null });
    }
  }
  next();
});

const Board = mongoose.model('Board', boardSchema);
module.exports = Board;
