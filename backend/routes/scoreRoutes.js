const express = require('express');
const router = express.Router();
const Score = require('../models/Score');
const auth = require('../middleware/authMiddleware');

router.post('/save', auth, async (req, res) => {
    const { wpm, accuracy, words } = req.body;
    try {
        const newScore = new Score({ userId: req.user.id, wpm, accuracy, wordsTyped:words });
        await newScore.save();
        res.json(newScore);
    } catch (err) {
        res.status(500).send('Data synchronization failed');
    }
});

router.get('/history', auth, async (req, res) => {
    try {
        const scores = await Score.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(10);
        res.json(scores);
    } catch (err) {
        res.status(500).send('Fetch error');
    }
});

module.exports = router;
