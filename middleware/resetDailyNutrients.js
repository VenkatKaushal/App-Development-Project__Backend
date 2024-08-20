const User = require('../models/Users');

const resetDailyNutrients = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const today = new Date();
        const todayString = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD

        // Check if `lastUpdated` is not today
        if (user.lastUpdated.toISOString().split('T')[0] !== todayString) {
            user.previousDailyNutrients = user.dailyNutrients; // Save current daily nutrients
            user.dailyNutrients = []; // Reset daily nutrients
            user.lastUpdated = today; // Update lastUpdated to today
            await user.save();
        }

        next();
    } catch (error) {
        next(error); // Pass errors to the error handling middleware
    }
};

module.exports = resetDailyNutrients;
