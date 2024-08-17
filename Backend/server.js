const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const auth = require('./routes/auth');
const nutrientRouters = require('./routes/nutrientRouter');
const foodRoutes = require('./routes/foodRouter');
const suggestionsRouter = require('./routes/suggestionRoute'); 
const errorMiddleware = require('./middleware/error');
const StandardRoute = require('./routes/standardRoute');

const dailyWeekly = require('./routes/dailyWeekly');
const resetWeeklyNutrients = require('./middleware/resetWeeklyNutrients');

dotenv.config();

const app = express();


connectDB();


app.use(express.json({ extended: false }));


app.use('/api/auth', auth);
app.use('/api/nutrients', nutrientRouters); 
app.use('/api/food', foodRoutes); 
app.use('/api', dailyWeekly);
app.use('/api/nutrients', suggestionsRouter);
console.log(1);
app.use('/api/standard', StandardRoute);
console.log(2);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
