const { Magic } = require('@magic-sdk/admin');
const User = require('../models/userModel');

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

const getUsers = async (req, res) => {
  const user = await User.find({});

  if (!user) {
    return res.status(400).json({ message: 'no user found' });
  }
  return res.status(200).json(user);
};

const createUser = async (req, res) => {
  const { name, phone, email, venmo } = req.body;
  try {
    const userExists = await User.findOne({ name });

    if (userExists) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, phone, email, venmo });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  getUsers,
  createUser,
};
