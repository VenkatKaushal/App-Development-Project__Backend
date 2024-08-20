const User = require('../models/Users');

const resetWeeklyNutrients = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const today = new Date();
        const currentDay = today.getDay(); // 0 (Sunday) through 6 (Saturday)

        // Check if today is Monday and the user's last update was not on Monday
        if (currentDay === 1 && (user.lastUpdated.getDay() !== 1 || !user.lastUpdated)) {
            user.previousWeeklyNutrients = user.weeklyNutrients;
            user.weeklyNutrients = [];
            user.lastUpdated = today; // Update the lastUpdated field
            await user.save();
        }

        next();
    } catch (error) {
        next(error); // Pass errors to the error handling middleware
    }
};

module.exports = resetWeeklyNutrients;
