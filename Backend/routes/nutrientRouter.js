const express = require('express');
const router = express.Router();
const { getAggregatedNutrients } = require('../controllers/foodController');

router.post('/aggregate-nutrients', getAggregatedNutrients);

module.exports = router;
