// backend/routes/turn.js
const express = require('express');
const router = express.Router();
const Turn = require('../models/Turn');

// Endpoint to get the current turn
router.get('/current', async (req, res) => {
    try {
        const currentTurn = await Turn.getCurrentTurn(); // Assuming you store turns with a timestamp
        res.json({ month: currentTurn.month, year: currentTurn.year });
    } catch (err) {
        res.status(500).json({ error: 'Failed to get current turn information' });
    }
});

module.exports = router;
