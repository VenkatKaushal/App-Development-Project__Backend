const express = require('express');
const router = express.Router();
const { registerUser, loginUser, ForgetPassword, updateProfile} = require('../controllers/authControllers');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/forget',ForgetPassword);
router.put('/profile', authMiddleware, upload.single('profilePicture'), updateProfile);

module.exports = router;
