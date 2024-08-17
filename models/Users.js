const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    profilePicture: {
        type: String,
        default: "",
    },
    age: {
        type: Number,
        default: null,
    },
    gender: {
        type: String,
        default: "",
    },
    height: {
        type: Number,
        default: null,
    },
    weight: {
        type: Number,
        default: null,
    },

});

const NutrientSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    unit: String,
});

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
        type: ProfileSchema,
        default: {},
    },
    date: {
        type: Date,
        default: Date.now,
    },
    dailyNutrients: { 
        type: [NutrientSchema], 
        default: [] 
    },
    weeklyNutrients: { 
        type: [NutrientSchema], 
        default: [] 
    },
    lastUpdated: { 
        type: Date, 
        default: Date.now 
    }
});




module.exports = mongoose.model('User', UserSchema);
