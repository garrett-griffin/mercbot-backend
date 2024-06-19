// routes/auth.js
const express = require('express');
const { register, login, updateUsername, updatePassword, getUser } = require('../controllers/authController');
const passport = require('passport');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Protected routes
router.post('/updateUsername', passport.authenticate('jwt', { session: false }), updateUsername);
router.post('/updatePassword', passport.authenticate('jwt', { session: false }), updatePassword);
router.get('/user/:id', passport.authenticate('jwt', { session: false }), getUser);

module.exports = router;
