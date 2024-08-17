const express = require('express');
const router = express.Router();
const {getNutrientInformation } = require("../controllers/foodController");

router.get('/nutrient/:name', getNutrientInformation);

module.exports = router;