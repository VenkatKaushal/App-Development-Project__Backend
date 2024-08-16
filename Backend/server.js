const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const nutrientRouters = require('./routes/nutrientRouter'); // Ensure correct path to your router

connectDB();

app.use(express.json({ extended: false }));
app.use('/api/auth', require('./routes/auth')); // Ensure correct path to your auth routes
app.use('/api', nutrientRouters);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
