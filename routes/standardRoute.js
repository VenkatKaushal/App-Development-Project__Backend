const express = require('express');
const router = express.Router();
const { getNutritionalValue } = require('../controllers/standardNutritionalController');

console.log(3);
router.post('/nutritional-values', getNutritionalValue);
console.log(4);

module.exports = router;
