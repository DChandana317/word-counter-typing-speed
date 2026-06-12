const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    wpm: { type: Number, required: true },
    accuracy: { type: Number, required: true },
    wordsTyped: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Score', ScoreSchema);
