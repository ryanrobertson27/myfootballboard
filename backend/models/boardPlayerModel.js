const mongoose = require('mongoose');

const { Schema } = mongoose;

const boardPlayerSchema = new Schema({
  board: { type: Schema.Types.ObjectId, ref: 'Board' },
  first: { type: String, required: true },
  last: { type: String, required: true },
  email: { type: String, required: true },
  venmo: { type: String, default: '' },
  phone: { type: String,  },
  squares : [{ type: Schema.Types.ObjectId, ref: 'Square' }],
});

const BoardPlayer = mongoose.model('BoardPlayer', boardPlayerSchema);
module.exports = BoardPlayer;
