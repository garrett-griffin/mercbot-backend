// backend/routes/gameAccount.js
const express = require('express');
const router = express.Router();
const { GameAccount } = require('../models');

// Endpoint to create a game account
router.post('/create', async (req, res) => {
    try {
        const { apiUser, apiToken, seasonId, userId } = req.body;
        const newGameAccount = await GameAccount.create({ apiUser, apiToken, seasonId, userId });
        res.status(201).json(newGameAccount);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create game account' });
    }
});

// Endpoint to list game accounts for a user
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const gameAccounts = await GameAccount.findAll({ where: { userId } });
        res.json(gameAccounts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch game accounts' });
    }
});

// Endpoint to delete a game account
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await GameAccount.destroy({ where: { id } });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete game account' });
    }
});

module.exports = router;
