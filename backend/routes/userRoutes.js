const express = require('express');

const router = express.Router();

const { Magic } = require('@magic-sdk/admin');

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

const User = require('../models/userModel');

const userController = require('../controllers/userController');

// TODO move to controller

router.post('/login', async (req, res) => {
  try {
    const didToken = req.headers.authorization.substring(7);
    await magic.token.validate(didToken);

    res.status(200).json({ authenticated: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// TODO move to controller

router.post('/check-user', async (req, res) => {
  try {
    console.log(req.body.email);
    const user = await User.findOne({ email: req.body.email }).exec();
    console.log(user);
    if (user) {
      return res.status(200).json({ userExists: true });
    }
    return res.status(200).json({ userExists: false });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post('/register', async (req, res) => {
  const { id, name, phone, email, venmo } = req.body;
  try {
    const user = await User.create({
      _id: id,
      name,
      phone,
      email,
      venmo,
    });

    if (!user) {
      throw new Error('Error creating user');
    }

    return res.status(200).json(user);
  } catch (err) {
    if (err) {
      return res.status(400).json(err);
    }
  }
});

router.get('/', userController.getUsers);

router.post('/new-user', userController.createUser);

router.get('/wins', userController.getUsersWins);

router.get('/:email/boards', userController.getBoardsByUserEmail);

module.exports = router;
