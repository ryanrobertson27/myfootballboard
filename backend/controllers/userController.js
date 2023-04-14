const { Magic } = require('@magic-sdk/admin');
const User = require('../models/userModel');

const magic = new Magic(process.env.MAGIC_SECRET_KEY);


// TODO protect this route
const getUsers = async (req, res) => {
  const user = await User.find({});

  if (!user) {
    return res.status(400).json({ message: 'no user found' });
  }
  return res.status(200).json(user);
};

//TODO protect this route
const checkUser = async (req, res) => {
  try {
    console.log(`checkUser email: ${req.body.email}`);
    const user = await User.findOne({ email: req.body.email });
    console.log(`checkUser: ${user}`);
    if (user) {
      return res.status(200).json({ userExists: true });
    }
    return res.status(200).json({ userExists: false });
  } catch (error) {
    return res.status(400).json({ error });
  }
};


//
const loginUser = async (req, res) => {
  try {
    console.log(req.headers.authorization)
    const didToken = req.headers.authorization.substring(7);
    await magic.token.validate(didToken);

    res.status(200).json({ authenticated: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  const {  first, last, phone, email, venmo } = req.body;
  try {
    const alreadyUser = await User.find({ email });

    if (alreadyUser.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create({
      first,
      last,
      phone,
      email,
      venmo,
    });
    
    if (!user) {
      res.status(400).json({ error: 'User not created' });
    }
    
    return res.status(200).json(user);
  } catch (err) {
    if (err) {
      return res.status(400).json(err);
    }
  }
};

const getUserByEmail = async (req, res) => {
  try {

    const { email } = req.body;
  
    const user = await User.findOne({ email })
  
    if(!user) {
      throw new Error('no user found')
    }
    
    return res.status(200).json(user);
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

const getUsersWins = async (req, res) => {
  const users = await User.find({ wins: { $exists: true, $ne: [] } });

  if (!users) {
    return res.status(400).json({ error: 'no users found' });
  }

  return res.status(200).json(users);
};

const getUserBoardsByEmail = async (req, res) => {
  const { email } = req.body;

  console.log(req.body)

  try {
    const boards = await User.findOne({ email }).populate({path: 'boards', perDocumentLimit: 4});

    if (!boards) {
      return res.status(400).json({ error: 'no boards found' });
    }

    return res.status(200).json(boards.boards);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = {
  getUsers,
  checkUser,
  registerUser,
  loginUser,
  getUserByEmail,
  getUsersWins,
  getUserBoardsByEmail,
};
