// controllers/authController.js
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

exports.register = async (req, res) => {
    const { reg_email, reg_password } = req.body;

    const username = reg_email;
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ error: 'Account already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(reg_password, 10);

        // Create a new user
        const user = await User.create({ username, password: hashedPassword, email: username });
        res.status(201).json({ message: 'Registration successful', user });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed. Try again: ' + error.message });
    }
};

exports.login = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token, id: user.id, role: user.role, firstName: user.firstName, lastName: user.lastName, email: user.email, username: user.username });
    })(req, res, next);
};

exports.updateUsername = async (req, res) => {
    const { newUsername } = req.body;
    const userId = req.user.id;

    try {
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        user.username = newUsername;
        user.email = newUsername;
        await user.save();
        res.status(200).json({ message: 'Username updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update username: ' + error.message });
    }
};

exports.updatePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    try {
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Check if the current password is correct
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            return res.status(401).json({ error: 'Current password is incorrect' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update password: ' + error.message });
    }
};

exports.getUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId, { attributes: ['id', 'username'] });
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user: ' + error.message });
    }
};
