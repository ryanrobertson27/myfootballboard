const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);

router.post('/user', userController.addNewUser);

router.patch('/user', userController.editUser);

router.delete('/user', userController.deleteUser);

module.exports = router;
