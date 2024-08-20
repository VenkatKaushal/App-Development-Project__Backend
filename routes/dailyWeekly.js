const express = require('express');
const router = express.Router();
const nutrientController = require('../controllers/DailyWeeklyController');
const authMiddleware = require('../middleware/auth');
const resetWeeklyNutrients = require('../middleware/resetWeeklyNutrients');
const resetDailyNutrients = require('../middleware/resetDailyNutrients');

router.use(authMiddleware);


router.get('/nutrients/daily', resetDailyNutrients, nutrientController.getDailyNutrientIntake);
router.get('/nutrients/weekly', resetWeeklyNutrients, nutrientController.getWeeklyNutrientIntake);
router.post('/nutrients/daily-calculate', nutrientController.calculateDailyNutrients);

module.exports = router;
