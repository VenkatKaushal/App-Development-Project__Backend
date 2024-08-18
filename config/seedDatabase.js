const mongoose = require('mongoose');
const NutritionalRequirements = require('../models/Standard');
const NutrientSuggestion = require('../models/NutrientSuggestion');

const suggestions  = [
    {
        nutrient: 'Protein',
        type: 'deficiency',
        suggestions: [
            'Include Chickpeas (Chana): High in protein, chickpeas can be used in various dishes like chana masala, salads, or as a snack (roasted chana).',
            'Consume Soya Chunks: Soya chunks are rich in protein and can be added to curries or pulao.',
            'Add Quinoa: Though not traditionally Indian, quinoa is gaining popularity and is rich in protein. It can be used as a substitute for rice or in salads',
        ],
    },
    {
        nutrient: 'Carbohydrate ',
        type: 'deficiency',
        suggestions: [
            'Consume Rice: Rice is a primary source of carbohydrates in Indian diets. Include both white and brown rice in meals.',
            'Eat Whole Wheat Rotis: Rotis made from whole wheat flour are a staple in Indian households and provide essential carbohydrates.',
            'Add Potatoes: Potatoes are versatile and can be used in curries, parathas, or as a side dish to boost carbohydrate intake.',
        ],
    },
    {
        nutrient: 'Fat',
        type: 'deficiency',
        suggestions: [
            'Use Ghee (Clarified Butter): Ghee is a traditional fat source and can be used in cooking or drizzled over rotis and rice.',
            'Include Nuts: Almonds, walnuts, and cashews are rich in healthy fats and can be consumed as snacks or added to dishes.',
            'Use Coconut: Coconut, especially in South Indian cuisine, is a good source of healthy fats and can be used in curries, chutneys, or as a topping.',
        ],
    },
    {
        nutrient: 'Fiber',
        type: 'deficiency',
        suggestions: [
            'Add Whole Grains: Include whole grains like brown rice, oats, and millet (ragi) to increase fiber intake..',
            'Eat More Vegetables: Vegetables like carrots, beans, and green leafy vegetables are high in fiber and should be included in every meal.',
            'Consume Flaxseeds: Flaxseeds are rich in fiber and can be added to smoothies, yogurt, or sprinkled on salads.',
        ],
    },
    {
        nutrient: 'Sugars',
        type: 'deficiency',
        suggestions: [
            'Eat Fruits: Fruits like bananas, mangoes, and apples provide natural sugars and can help maintain energy levels.',
            'Include Jaggery: Jaggery is a traditional sweetener in India and can be used as an alternative to sugar in sweets and beverages.',
            'Consume Dates: Dates are naturally sweet and can be eaten as a snack or used in desserts.',
        ],
    },
    {
        nutrient: 'Cholesterol ',
        type: 'deficiency',
        suggestions: [
            'Include Eggs: Eggs contain cholesterol and can be included in the diet to maintain healthy levels.',
            'Eat Shrimp: Shrimp is another source of dietary cholesterol and can be used in curries or fried dishes.',
            'Consume Full-Fat Dairy: Full-fat milk, cheese, and yogurt contain cholesterol and can be included in a balanced diet',
        ],
    },
    {
        nutrient: 'Sodium ',
        type: 'deficiency',
        suggestions: [
            'Use Salt in Cooking: Ensure an adequate amount of iodized salt is used in daily cooking to meet sodium requirements.',
            'Include Pickles: Traditional Indian pickles contain salt and can be added to meals for sodium intake.',
            'Eat Curd (Yogurt) with Salt: Adding a pinch of salt to curd can enhance flavor and sodium intake.'
        ],
    },
    {
        nutrient: 'Calcium ',
        type: 'deficiency',
        suggestions: [
            'Drink Milk: Milk is a primary source of calcium in Indian diets and should be consumed daily.',
            'Include Sesame Seeds: Sesame seeds (til) are rich in calcium and can be used in sweets, sprinkled on salads, or added to rotis.',
            'Consume Leafy Greens: Leafy greens like amaranth (chaulai) and fenugreek (methi) are good sources of calcium.',
        ],
    },
    {
        nutrient: 'Iron ',
        type: 'deficiency',
        suggestions: [
            'Include Beetroot: Beetroot is rich in iron and can be consumed raw in salads or cooked in curries.',
            'Cook with Fenugreek (Methi) Leaves: Fenugreek leaves are high in iron and can be used in parathas, curries, or as a side dish.',
            'Eat Blackstrap Molasses: Blackstrap molasses is a traditional source of iron and can be added to sweet dishes or taken as a supplement.',
        ],
    },
    {
        nutrient: 'Vitamin C',
        type: 'deficiency',
        suggestions: [
            'Include Guava: Guava is rich in Vitamin C and can be consumed raw or as a juice.',
            'Consume Tamarind: Tamarind is used in many Indian dishes and is a good source of Vitamin C.',
            'Eat Green Chilies: Green chilies are high in Vitamin C and can be added to various dishes to spice them up while boosting nutrient intake.',
        ],
    },
    {
        nutrient: 'Protein',
        type: 'excess',
        suggestions: [
            'Limit Red Meat: Red meat like mutton should be consumed in moderation to avoid excessive protein intake.',
            'Reduce Protein Supplements: If using protein powders or supplements, consider reducing the dosage or frequency.',
            'Balance with Vegetables: Include more vegetables in meals to balance protein intake and avoid excess.',
        ],
    },
    {
        nutrient: 'Carbohydrate ',
        type: 'excess',
        suggestions: [
            'Cut Down on Rice: Limit the amount of white rice consumed, and opt for smaller portions or switch to brown rice.',
            'Reduce Bread Intake: White bread is high in carbohydrates; consider reducing its consumption and opting for whole-grain alternatives.',
            'Limit Sweets and Desserts: Indian sweets are often high in carbohydrates and should be eaten sparingly.',
        ],
    },
    {
        nutrient: 'Fat',
        type: 'excess',
        suggestions: [
            'Reduce Oil Usage: Limit the amount of cooking oil used, especially in fried foods, and opt for healthier oils like olive or mustard oil.',
            'Avoid Creamy Curries: Rich, creamy curries made with butter, cream, or coconut milk should be consumed in moderation.',
            'Limit Cheese and Paneer: While paneer and cheese are nutritious, they are also high in fat and should be eaten in moderation.',
        ],
    },
    {
        nutrient: 'Fiber',
        type: 'excess',
        suggestions: [
            'Moderate Whole Grain Consumption: Overconsumption of whole grains like brown rice, oats, and whole wheat can lead to excessive fiber intake.',
            'Balance Raw Vegetables: While vegetables are healthy, consuming too many raw vegetables high in fiber may cause digestive discomfort.',
            'Limit Fiber Supplements: If taking fiber supplements, ensure they are taken in appropriate amounts to avoid excessive fiber intake.',
        ],
    },
    {
        nutrient: 'Sugars',
        type: 'excess',
        suggestions: [
            'Limit Sweets and Mithai: Traditional Indian sweets like barfi, rasgulla, and peda are high in sugar and should be eaten occasionally.',
            'Cut Down on Soft Drinks: Sugary beverages like sodas and sweetened fruit juices are high in sugar and should be avoided.',
            'Watch Out for Hidden Sugars: Be cautious of hidden sugars in packaged foods, sauces, and ready-to-eat meals.',
        ],
    },
    {
        nutrient: 'Cholesterol ',
        type: 'excess',
        suggestions: [
            'Reduce Egg Yolk Consumption: Egg yolks are high in cholesterol; consider limiting them to a few per week.',
            'Limit Red Meat and Organ Meats: Foods like liver and red meats are high in cholesterol and should be consumed in moderation.',
            'Avoid Deep-Fried Foods: Deep-fried snacks like samosas, pakoras, and kachoris are high in cholesterol and should be limited.',
        ],
    },
    {
        nutrient: 'Sodium ',
        type: 'excess',
        suggestions: [
            'Avoid Processed and Packaged Foods: Packaged snacks, ready-to-eat meals, and instant noodles often contain high sodium levels.',
            'Limit Salted Snacks: Snacks like chips, namkeens, and salted nuts are high in sodium and should be consumed sparingly.',
            'Cut Down on Restaurant Foods: Restaurant foods often have high sodium content; consider eating out less frequently or requesting low-sodium options.'
        ],
    },
    {
        nutrient: 'Calcium ',
        type: 'excess',
        suggestions: [
            'Limit Dairy Products: Excessive consumption of dairy products like milk, cheese, and yogurt can lead to high calcium levels.',
            'Be Cautious with Calcium Supplements: If taking calcium supplements, ensure they are taken as per the recommended dosage.',
            'Avoid Overconsumption of Fortified Foods: Some foods are fortified with calcium, and overconsumption can lead to excessive calcium intake.',
        ],
    },
    {
        nutrient: 'Iron ',
        type: 'excess',
        suggestions: [
            'Reduce Red Meat Intake: Red meat is high in iron, and consuming it in large amounts can lead to excess iron levels.',
            'Limit Iron-Fortified Foods: Some cereals and bread are fortified with iron; consuming them in moderation can prevent excessive intake.',
            'Avoid Excessive Use of Iron Supplements: If taking iron supplements, ensure they are taken according to medical advice to avoid overdose.',
        ],
    },
    {
        nutrient: 'Vitamin C',
        type: 'excess',
        suggestions: [
            'Limit Citrus Fruits: Consuming too many citrus fruits like oranges, lemons, and limes can lead to excessive Vitamin C intake.',
            'Be Cautious with Vitamin C Supplements: Ensure that Vitamin C supplements are taken as per the recommended daily allowance.',
            'Reduce Amla Consumption: Amla (Indian gooseberry) is rich in Vitamin C; consuming it in large quantities should be moderated.',
        ],
    },
]
    
       
const requirements  = [
    {
        AgeGroup: "1-3 years",
        Gender: "Male",
        Protein: 13,
        Carbohydrates: 130,
        Fats: 40,
        Fiber: 19,
        Calcium: 0.5,
        Iron: 0.007,
        VitaminC: 0.015
    },
    {
        AgeGroup: "1-3 years",
        Gender: "Female",
        Protein: 13,
        Carbohydrates: 130,
        Fats: 40,
        Fiber: 19,
        Calcium: 0.5,
        Iron: 0.007,
        VitaminC: 0.015
    },
    {
        AgeGroup: "4-8 years",
        Gender: "Male",
        Protein: 19,
        Carbohydrates: 150,
        Fats: 50,
        Fiber: 25,
        Calcium: 0.8,
        Iron: 0.01,
        VitaminC: 0.025
    },
    {
        AgeGroup: "4-8 years",
        Gender: "Female",
        Protein: 19,
        Carbohydrates: 150,
        Fats: 50,
        Fiber: 25,
        Calcium: 0.8,
        Iron: 0.01,
        VitaminC: 0.025
    },
    {
        AgeGroup: "9-13 years",
        Gender: "Male",
        Protein: 34,
        Carbohydrates: 200,
        Fats: 60,
        Fiber: 30,
        Calcium: 1.3,
        Iron: 0.008,
        VitaminC: 0.045
    },
    {
        AgeGroup: "9-13 years",
        Gender: "Female",
        Protein: 34,
        Carbohydrates: 200,
        Fats: 60,
        Fiber: 30,
        Calcium: 1.3,
        Iron: 0.008,
        VitaminC: 0.045
    },
    {
        AgeGroup: "14-18 years",
        Gender: "Male",
        Protein: 52,
        Carbohydrates: 275,
        Fats: 75,
        Fiber: 38,
        Calcium: 1.3,
        Iron: 0.011,
        VitaminC: 0.075
    },
    {
        AgeGroup: "14-18 years",
        Gender: "Female",
        Protein: 46,
        Carbohydrates: 250,
        Fats: 70,
        Fiber: 25,
        Calcium: 1.3,
        Iron: 0.015,
        VitaminC: 0.075
    },
    {
        AgeGroup: "19-50 years",
        Gender: "Male",
        Protein: 56,
        Carbohydrates: 300,
        Fats: 70,
        Fiber: 30,
        Calcium: 1,
        Iron: 0.008,
        VitaminC: 0.09
    },
    {
        AgeGroup: "19-50 years",
        Gender: "Female",
        Protein: 46,
        Carbohydrates: 250,
        Fats: 70,
        Fiber: 25,
        Calcium: 1,
        Iron: 0.018,
        VitaminC: 0.075
    },
    {
        AgeGroup: "51+ years",
        Gender: "Male",
        Protein: 56,
        Carbohydrates: 300,
        Fats: 70,
        Fiber: 30,
        Calcium: 1.2,
        Iron: 0.008,
        VitaminC: 0.09
    },
    {
        AgeGroup: "51+ years",
        Gender: "Female",
        Protein: 46,
        Carbohydrates: 250,
        Fats: 70,
        Fiber: 25,
        Calcium: 1.2,
        Iron: 0.018,
        VitaminC: 0.075
    }
];

async function seedDatabase() {
    
    try {
        console.log("Enter Seeding");
        const mongoURI = 'mongodb://mongo_db:27017/LoginAuthentication'; 
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connection was successful.');
        for (const suggestion of suggestions) {
            const exists = await NutrientSuggestion.findOne({
                nutrient: suggestion.nutrient,
                type: suggestion.type
            });

            if (!exists) {
                await NutrientSuggestion.create(suggestion);
                console.log(`Added suggestions for ${suggestion.nutrient} (${suggestion.type})`);
            } else {
                console.log(`Suggestions for ${suggestion.nutrient} (${suggestion.type}) already exist`);
            }
        }
        console.log('Seeding completed.');
        
        for (const requirement of requirements) {
            const exists = await NutritionalRequirements.findOne({
                ageGroup: requirement.AgeGroup,
                gender: requirement.Gender
            });

            if (!exists) {
                await NutritionalRequirements.create({
                    ageGroup: requirement.AgeGroup,
                    gender: requirement.Gender,
                    protein: requirement.Protein,
                    carbohydrates: requirement.Carbohydrates,
                    fats: requirement.Fats,
                    fiber: requirement.Fiber,
                    calcium: requirement.Calcium,
                    iron: requirement.Iron,
                    vitaminC: requirement.VitaminC
                });
                console.log(`Added suggestions for ${requirement.AgeGroup} (${requirement.Gender})`);
            } else {
                console.log(`Suggestions for ${requirement.AgeGroup} (${requirement.Gender}) already exist`);
            }
        }

        console.log('Seeding completed.');

    } catch (err) {
        console.error('Error seeding database:', err);
    }
}

seedDatabase();