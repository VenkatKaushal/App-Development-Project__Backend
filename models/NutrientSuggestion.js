const mongoose = require('mongoose');

const NutrientSuggestionSchema = new mongoose.Schema({
    nutrient: { type: String, required: true },
    type: { type: String, required: true },
    suggestions: [String]
});

const NutrientSuggestion = mongoose.model('NutrientSuggestion', NutrientSuggestionSchema);

module.exports = NutrientSuggestion;
