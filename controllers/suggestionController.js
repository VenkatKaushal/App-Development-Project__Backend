const NutrientSuggestion = require('../models/NutrientSuggestion');

const getBatchSuggestions = async (queries) => {
    try {
        const promises = queries.map(({ nutrient, type }) =>
            NutrientSuggestion.findOne({ nutrient, type })
        );
        return await Promise.all(promises);
    } catch (err) {
        throw new Error('Error fetching batch suggestions:', err);
    }
};

module.exports = {
    getBatchSuggestions
};
