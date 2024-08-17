const mongoose = require('mongoose');

const NutritionalRequirementsSchema  = new mongoose.Schema({
    ageGroup: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true,
    },
    protein: {
        type: Number,
        required: true,
    },
    carbohydrates: {
        type: Number,
        required: true,
    },
    fats: {
        type: Number,
        required: true,
    },
    fiber: {
        type: Number,
        required: true,
    },
    calcium: {
        type: Number,
        required: true,
    },
    iron: {
        type: Number,
        required: true,
    },
    vitaminC: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('NutritionalRequirements', NutritionalRequirementsSchema);
