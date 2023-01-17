const express = require('express');

const router = express.Router();

const { Magic } = require('@magic-sdk/admin');

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

router.post('/login', async (req, res) => {
  try {
    console.log(req.header.authorization);
    const didToken = req.headers.authorization.substr(7);
    await magic.token.validate(didToken);
    res.status(200).json({ authenticated: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const userController = require('../controllers/userController');

router.get('/', userController.getUser);

module.exports = router;
