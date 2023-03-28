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
  firstQuarter: { type: Object, default: {awayScore: 0, homeScore: 0} },
  secondQuarter: { type: Object, default: {awayScore: 0, homeScore: 0} },
  thirdQuarter: { type: Object, default: {awayScore: 0, homeScore: 0} },
  fourthQuarter: { type: Object, default: {awayScore: 0, homeScore: 0} },
  timeRemaining: { type: Number, default: 3600 },
})

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
