const axios = require('axios');
const {FDC_API_KEY, FDC_BASE_URL} = require('../config/food_data');
const foodData = require('../FDC_ID');


exports.getNutrientInformation = async (req, res) => {
    const foodItem = req.params.name; 
    const fdcId = foodData[foodItem];
    console.log(foodItem);

    if(!fdcId)
    {
        return res.status(404).json({message: 'Food item not found'});
    }

    try {
        const response = await axios.get(`${FDC_BASE_URL}/food/${fdcId}`,   {
            params: {
                api_key: FDC_API_KEY
            }
        });

        const nutrients = response.data.foodNutrients.map(nutrient => ({
            name: nutrient.nutrient.name,
            amount: nutrient.amount,
            unit: nutrient.nutrient.unitName
        }));

        res.status(200).json({foodItem, nutrients});
    } catch (error) {
        console.error('Error fetching nutrient information: ', error);
        res.status(500).json({message: 'Server Error'});
    }
};