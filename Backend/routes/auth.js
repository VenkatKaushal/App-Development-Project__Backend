const express = require('express');
const router = express.Router();
const { registerUser, loginUser, ForgetPassword } = require('../controllers/authControllers');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/forget',ForgetPassword);

module.exports = router;
