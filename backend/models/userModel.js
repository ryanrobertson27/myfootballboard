const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  first: { type: String, required: true },
  last: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  squares: [{ type: Schema.Types.ObjectId, ref: 'Square' }],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
