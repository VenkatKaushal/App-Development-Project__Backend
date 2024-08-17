const axios = require('axios');
const { FDC_API_KEY, FDC_BASE_URL } = require('../config/food_data');
const foodData = require('../FDC_ID');

exports.getNutrientInformation = async (req, res) => {
    const foodItem = req.params.name;
    const fdcId = foodData[foodItem];

    if (!fdcId) {
        console.error(`No details found for ${foodItem}`);
        return res.status(404).send({ error: `No details found for ${foodItem}` });
    }

    try {
        const response = await axios.get(`${FDC_BASE_URL}/food/${fdcId}`, {
            params: { api_key: FDC_API_KEY }
        });

        const nutrients = response.data.foodNutrients || [];
        const nutrientInfo = nutrients.map(nutrient => ({
            name: nutrient.nutrient.name,
            amount: nutrient.amount,
            unit: nutrient.nutrient.unitName
        }));

        res.status(200).send(nutrientInfo);
    } catch (error) {
        console.error(`Error fetching data for ${foodItem}:`, error);
        res.status(500).send({ error: `Error fetching data for ${foodItem}` });
    }
};
