const User = require('../models/Users');

const resetWeeklyNutrients = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const today = new Date();

    if (today.getDay() === 1 && user.lastUpdated.getDay() !== 1) {
        user.previousWeeklyNutrients = user.weeklyNutrients;
        user.weeklyNutrients = [];
        await user.save();
    }
    next();
};

module.exports = resetWeeklyNutrients;
