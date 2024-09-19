const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', [
  body('name').not().isEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
], authController.register);

router.post('/login', authController.login);

router.post('/logout', authController.logout);

module.exports = router;
