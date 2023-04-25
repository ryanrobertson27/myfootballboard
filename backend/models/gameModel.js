const mongoose = require('mongoose');

const { Schema } = mongoose;

const quarterSchema = new Schema({
  awayScore: {type: Number, default: 0},
  homeScore: {type: Number, default: 0},
});

const gameSchema = new Schema({
  board: { type: Schema.Types.ObjectId, ref: 'Board' },
  awayTeamName: { type: String, required: true },
  homeTeamName: { type: String, required: true },
  awayTeamScore: { type: Number, default: 0 },
  homeTeamScore: { type: Number, default: 0 },
  currentQuarter: { type: Number, default: 1 },
  firstQuarter: { type: Object, default: {awayScore: null, homeScore: null, completed: false} },
  secondQuarter: { type: Object, default: {awayScore: null, homeScore: null, completed: false} },
  thirdQuarter: { type: Object, default: {awayScore: null, homeScore: null, completed: false} },
  fourthQuarter: { type: Object, default: {awayScore: null, homeScore: null, completed: false} },
  timeRemaining: { type: Number, default: 3600 },
  state: { type: String, enum: ['NOT_STARTED', 'ACTIVE', 'FINISHED'], default: 'NOT_STARTED'},
})

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
