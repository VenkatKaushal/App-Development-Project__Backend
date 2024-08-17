const axios = require('axios');
const { FDC_API_KEY, FDC_BASE_URL } = require('../config/food_data');
const foodData = require('../FDC_ID');

const aggregateNutrients = async (foodItems) => {
    const nutrientAggregation = {};
    const missingItems = [];

    for (const foodItem of foodItems) {
        const fdcId = foodData[foodItem];
        if (!fdcId) {
            missingItems.push(foodItem);
            continue;
        }

        try {
            const response = await axios.get(`${FDC_BASE_URL}/food/${fdcId}`, {
                params: { api_key: FDC_API_KEY }
            });

            const nutrients = response.data.foodNutrients || [];
            nutrients.forEach(nutrient => {
                const name = nutrient.nutrient.name; 
                const amount = nutrient.amount;
                const unit = nutrient.nutrient.unitName; 

                if (!name) {
                    console.warn('Nutrient name is missing or undefined');
                    return;
                }

                if (!nutrientAggregation[name]) {
                    nutrientAggregation[name] = {
                        amount: 0,
                        unit: unit,
                    };
                }
                nutrientAggregation[name].amount += amount;
            });
        } catch (error) {
            console.error(`Error fetching data for ${foodItem}:`, error);
            missingItems.push(foodItem);
        }
    }
    return { nutrientAggregation, missingItems };
};


exports.getAggregatedNutrients = async (req, res) => {
    const foodItems = req.body.foodItems;

    if (!Array.isArray(foodItems) || foodItems.length === 0) {
        return res.status(400).json({ message: 'Invalid food items list' });
    }

    try {
        const { nutrientAggregation, missingItems } = await aggregateNutrients(foodItems);
        res.status(200).json({
            aggregatedData: nutrientAggregation,
            missingItems: missingItems,
        });
    } catch (error) {
        console.error('Error processing nutrient data:', error);
        res.status(500).json({ message: 'Failed to aggregate nutrient data' });
    }
};
