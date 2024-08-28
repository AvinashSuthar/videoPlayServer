const express = require('express');
const { register, loginUser, getUserProfile} = require('../controllers/auth');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getUserProfile);

module.exports = router;
