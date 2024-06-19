// backend/routes/gameAccount.js
const express = require('express');
const router = express.Router();
const { GameAccount } = require('../models');
const { Season } = require('../models');
const passport = require("passport");
const User = require("../models/user");

// Endpoint to create a game account
router.post('/create', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const { apiUser, apiToken } = req.body;
        const userId = req.user.id;
        const season = await Season.getCurrentSeason();

        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });


        const newGameAccount = await GameAccount.create({ apiUser, apiToken, seasonId: season.id, userId });
        res.status(201).json(newGameAccount);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create game account: '+err });
    }
});

// Endpoint to list game accounts for a user
router.get('/get', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const userId = req.user.id;
        const gameAccounts = await GameAccount.findAll({ where: { userId }, order: [['apiUser', 'ASC']] });
        res.json(gameAccounts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch game accounts' });
    }
});

// Endpoint to delete a game account
router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const { id } = req.params;
        await GameAccount.destroy({ where: { id } });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete game account' });
    }
});

module.exports = router;
