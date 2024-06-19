const express = require('express');
const router = express.Router();
const { Town, GameAccount} = require('../models');
const { Season } = require('../models');
const passport = require("passport");
const User = require("../models/user");


router.get('/season/get', async (req, res) => {
    try {
        const season = await Season.getCurrentSeason();
        res.status(201).json(season);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch current season' });
    }
});

router.get('/season/getAll', async (req, res) => {
    try {
        const seasons = await Season.findAll({order: [['seasonNumber', 'ASC']] });
        res.status(201).json(seasons);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch seasons' });
    }
});

router.get('/towns/getAll', async (req, res) => {
    try {
        const towns = await Town.findAll({order: [['name', 'ASC']] });
        res.status(201).json(towns);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch towns' });
    }
});

router.get(`/towns/get/:id`, async (req, res) => {
    try {
        const town = await Town.get(req.params.id);
        res.status(201).json(town);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch towns' });
    }
});

module.exports = router;