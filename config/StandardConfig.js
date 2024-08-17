const mongoose = require('mongoose');
const NutritionalRequirements = require('../models/Standard');

const suggestions = [
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
        await mongoose.connect('mongodb://localhost:27017/LoginAuthentication');
        console.log('MongoDB connection was successful.');

        for (const suggestion of suggestions) {
            const exists = await NutritionalRequirements.findOne({
                ageGroup: suggestion.AgeGroup,
                gender: suggestion.Gender
            });

            if (!exists) {
                await NutritionalRequirements.create({
                    ageGroup: suggestion.AgeGroup,
                    gender: suggestion.Gender,
                    protein: suggestion.Protein,
                    carbohydrates: suggestion.Carbohydrates,
                    fats: suggestion.Fats,
                    fiber: suggestion.Fiber,
                    calcium: suggestion.Calcium,
                    iron: suggestion.Iron,
                    vitaminC: suggestion.VitaminC
                });
                console.log(`Added suggestions for ${suggestion.AgeGroup} (${suggestion.Gender})`);
            } else {
                console.log(`Suggestions for ${suggestion.AgeGroup} (${suggestion.Gender}) already exist`);
            }
        }

        console.log('Seeding completed.');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        mongoose.connection.close();
    }
}

seedDatabase();

