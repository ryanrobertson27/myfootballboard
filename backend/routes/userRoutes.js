const express = require('express');

const router = express.Router();

const { Magic } = require('@magic-sdk/admin');

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

const User = require('../models/userModel');

router.post('/login', async (req, res) => {
  try {
    console.log(req.header.authorization);
    const didToken = req.headers.authorization.substring(7);
    await magic.token.validate(didToken);
    res.status(200).json({ authenticated: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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

const userController = require('../controllers/userController');

router.get('/', userController.getUser);

module.exports = router;
