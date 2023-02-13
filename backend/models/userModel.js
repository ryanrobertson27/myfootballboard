const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String },
  phone: { type: String },
  email: { type: String },
  venmo: { type: String },
  boards: [{ type: Schema.Types.ObjectId, ref: 'Board' }],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
