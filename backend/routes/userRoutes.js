const express = require('express');
const router = express.Router();

const { Magic } = require('@magic-sdk/admin');
const magic = new Magic(process.env.MAGIC_SECRET_KEY);

const userController = require('../controllers/userController');

router.get('/', userController.getUsers);

router.get('/:email', userController.getUserByEmail)

router.get('/wins', userController.getUsersWins);

router.post('/login', userController.loginUser);

router.post('/check-user', userController.checkUser);

router.post('/register', userController.registerUser);

router.post('/user/boards', userController.getUserBoardsByEmail);



module.exports = router;
