const { Magic } = require('@magic-sdk/admin');
const { renderSync } = require('sass');
const User = require('../models/userModel');

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

const getUser = async (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json(req.user);
  }
  return res.status(401).json({ message: 'User is not logged in' });
};

const createUser = async (req, res) => {
  try {
    const userExists = await User.findOne({ name: req.body.name });

    if (userExists) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const user = await User.create({ name: req.body.name });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const addSquaresToUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { squares } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'Error getting ID from request' });
    }
    const user = await User.findOneAndUpdate(
      { _id: id },
      { $push: { squares: { $each: [...squares] } } },
      { new: true }
    );
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

module.exports = {
  getUser,
  createUser,
  addSquaresToUser,
};
