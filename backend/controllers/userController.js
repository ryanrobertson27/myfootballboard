const mongoose = require('mongoose');
const User = require('../models/userModel');

// TODO GET all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = User.find({});
    if (!users) {
      res.status(400).json({ message: 'no users found' });
    }
    res.status(200).json({ users });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

// TODO POST new user
exports.addNewUser = async (req, res) => {
  try {
    console.log(req.body);
    const user = User.findOne({ email: req.body.email }).exec();

    console.log(user);

    if (user.length) {
      return res
        .status(400)
        .json({ message: 'A user with that email already exists' });
    }

    const newUser = new User({
      first: req.body.first,
      last: req.body.last,
      email: req.body.email,
      role: req.body?.role || 'standard',
    });
    newUser.save();
    return res.status(200).json({ message: `user create: ${newUser}` });
  } catch (err) {
    res.status(400).json({ message: `error${err}` });
  }
};

// TODO PATCH a user
exports.editUser = (req, res) => {
  res.json('Edit User');
};

// TODO DELETE a user
exports.deleteUser = (req, res) => {
  res.json('Delete User');
};
