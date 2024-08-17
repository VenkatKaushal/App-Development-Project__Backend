const { aggregateNutrients } = require('./nutrientController');
const User = require('../models/Users');

exports.updateDailyNutrients = async (userId, foodItems) => {
    try {
        const { nutrientAggregation } = await aggregateNutrients(foodItems);
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }
        const weeklyNutrientAggregation = { ...nutrientAggregation };
        user.dailyNutrients = user.dailyNutrients.map(nutrient => {
            const dailyNutrient = nutrientAggregation[nutrient.name];
            if (dailyNutrient) {
                nutrient.amount += dailyNutrient.amount;
                delete nutrientAggregation[nutrient.name];
            }
            return nutrient;
        });

        Object.keys(nutrientAggregation).forEach(key => {
            user.dailyNutrients.push({
                name: key,
                amount: nutrientAggregation[key].amount,
                unit: nutrientAggregation[key].unit
            });
        });
        user.weeklyNutrients = user.weeklyNutrients.map(nutrient => {
            const weeklyNutrient = weeklyNutrientAggregation[nutrient.name];
            if (weeklyNutrient) {
                nutrient.amount += weeklyNutrient.amount;
            }
            return nutrient;
        });

        Object.keys(weeklyNutrientAggregation).forEach(key => {
            const existingNutrient = user.weeklyNutrients.find(n => n.name === key);
            if (!existingNutrient) {
                user.weeklyNutrients.push({
                    name: key,
                    amount: weeklyNutrientAggregation[key].amount,
                    unit: weeklyNutrientAggregation[key].unit
                });
            }
        });

        user.lastUpdated = new Date();
        await user.save();
    } catch (error) {
        console.error('Error updating daily nutrients:', error);
        throw error;
    }
};
exports.getDailyNutrientIntake = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ dailyNutrients: user.dailyNutrients });
    } catch (error) {
        console.error('Error fetching daily nutrient intake:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getWeeklyNutrientIntake = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ weeklyNutrients: user.weeklyNutrients });
    } catch (error) {
        console.error('Error fetching weekly nutrient intake:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
exports.calculateDailyNutrients = async (req, res) => {
    const { foodItems } = req.body;

    if (!Array.isArray(foodItems) || foodItems.length === 0) {
        return res.status(400).json({ message: 'Invalid food items list' });
    }

    try {
        const { nutrientAggregation, missingItems } = await aggregateNutrients(foodItems);
        await exports.updateDailyNutrients(req.user.id, foodItems);

        res.status(200).json({
            aggregatedData: nutrientAggregation,
            missingItems: missingItems,
        });
    } catch (error) {
        console.error('Error processing nutrient data:', error);
        res.status(500).json({ message: 'Failed to aggregate nutrient data' });
    }
};
