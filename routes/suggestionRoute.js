const express = require('express');
const router = express.Router();
const suggestionController = require('../controllers/suggestionController');

router.post('/batch-suggestions', async (req, res) => {
    const batchQueries = req.body; 
    try {
        const suggestions = await suggestionController.getBatchSuggestions(batchQueries);
        res.json(suggestions);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
