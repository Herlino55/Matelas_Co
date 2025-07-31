const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// CRUD
router.post('/', userController.createUser);
router.get('/', userController.getAllUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
