const mongoose = require('mongoose');

const dbURI = process.env.DB_URI;

const connectDB = async () => {
    try {
        console.log('Connecting to MongoDB with URI:', dbURI);
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connection was successful.');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
