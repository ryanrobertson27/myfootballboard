const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  first: { type: String },
  last: { type: String },
  phone: { type: String },
  email: { type: String },
  venmo: { type: String },
  boards: [{ type: Schema.Types.ObjectId, ref: 'Board' }],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
