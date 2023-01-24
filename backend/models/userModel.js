const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String },
  squares: [{ type: Schema.Types.ObjectId, ref: 'Square' }],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
