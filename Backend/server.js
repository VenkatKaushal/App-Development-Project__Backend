const express = require('express');
const connectDB = require('./config/db');
const User = require('./models/Users');
const dotenv = require('dotenv')

dotenv.config();

const app = express();

connectDB();

app.use(express.json({extended: false}));

app.use('/api/auth', require('./routers/auth'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})