const mongoose = require('mongoose');

const { Schema } = mongoose;

const gameModel = new Schema({
  board: { type: Schema.Types.ObjectId, ref: 'Board' },
  awayTeam: { type: String, required: true },
  homeTeam: { type: String, required: true },
  awayScore: { type: Number, default: 0 },
  homeScore: { type: Number, default: 0 },
  firstQuarter: { type: Number, default: 0 },
  secondQuarter: { type: Number, default: 0 },
  thirdQuarter: { type: Number, default: 0 },
  fourthQuarter: { type: Number, default: 0 },
  timeRemaining: { type: Number, default: 900 },
})

const Game = mongoose.model('Game', gameModel);
