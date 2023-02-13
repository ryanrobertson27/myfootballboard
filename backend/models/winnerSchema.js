const mongoose = require('mongoose');

const { Schema } = mongoose;

const winnerSchema = new Schema({
  winner: { week: Number, quarter: Number, user: String },
});

const Winner = mongoose.model('Winner', winnerSchema);
module.exports = Winner;
