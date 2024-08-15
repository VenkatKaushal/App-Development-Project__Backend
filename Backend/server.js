const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv')
dotenv.config();
const app = express();
const foodRouters = require('./routers/foodRouter');

connectDB();

app.use(express.json({extended: false}));
app.use('/api/auth', require('./routers/auth'));
app.use('/api/food', foodRouters);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})