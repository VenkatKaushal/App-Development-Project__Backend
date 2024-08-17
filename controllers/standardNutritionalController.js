const NutritionalRequirements = require('../models/Standard');

const getNutritionalValue = async (req, res) => {
    try {
        const { age, gender, nutrient } = req.body; // Use req.body for POST
        console.log(age, gender, nutrient); // Check if these values are coming through
        if (!age || !gender || !nutrient) {
            return res.status(400).json({ message: 'Missing parameters' });
        }

        const result = await NutritionalRequirements.findOne({ ageGroup: age, gender });
        console.log(result);
        if (!result) {
            return res.status(404).json({ message: 'No data found' });
        }

        const value = result[nutrient.toLowerCase()];

        if (value === undefined) {
            return res.status(400).json({ message: 'Invalid nutrient' });
        }

        res.json({ value });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};



module.exports = { getNutritionalValue };
