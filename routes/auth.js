const express = require('express');
const { validatorLogin, validatorRegister } = require('../validators/auth');
const { registerCtrl, loginCtrl } = require('../controllers/auth');
const router = express.Router();


// Login user
router.post('/login', validatorLogin, loginCtrl);

// Register user
router.post('/register', validatorRegister, registerCtrl);

module.exports = router;