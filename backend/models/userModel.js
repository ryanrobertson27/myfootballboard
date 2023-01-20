const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  first: { type: String },
  last: { type: String },
  email: { type: String },
  role: { type: String },
  squares: [{ type: Schema.Types.ObjectId, ref: 'Square' }],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
