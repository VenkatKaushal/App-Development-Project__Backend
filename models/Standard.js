const mongoose = require('mongoose');

const NutritionalRequirementsSchema = new mongoose.Schema({
    ageGroup: {
        type: String,
        enum: [
            '1-3 years',
            '4-8 years',
            '9-13 years',
            '14-18 years',
            '19-50 years',
            '51+ years'
        ],
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
