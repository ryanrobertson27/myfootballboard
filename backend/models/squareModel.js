const mongoose = require('mongoose');

const { Schema } = mongoose;

const squareSchema = new Schema({
  board: { type: Schema.Types.ObjectId, ref: 'Board' },
  owner: { type: Schema.Types.ObjectId, ref: 'BoardPlayer' },
  position: { type: Number, required: true },
  wins: { type: Number},
});

const Square = mongoose.model('Square', squareSchema);
module.exports = Square;
