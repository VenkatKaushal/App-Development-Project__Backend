# App-Development-Project---SDG

#UG-3 Team-4
# README

The updated APK is uploaded in Front-End Github Repo as well as in Back-End GitHub repo....
Name of APK is NutriGuide.apk

Login Screen:

Overview
This Flutter project contains a LoginScreen widget, which provides a user interface for logging into an application. The login process involves validating the user's email and password, sending the credentials to a backend server, and handling the response. If the login is successful, the user is redirected to the home_page, and their authentication token is securely stored using Hive.
Key Features
LoginScreen
•	UI Elements: The LoginScreen includes an AppBar with a title, a welcome message, an image, and a LoginForm widget for collecting user credentials.
•	Responsiveness: The layout adjusts automatically to avoid overlapping with the keyboard when the user inputs data.
•	Sign up option for a new user and forgot password option for a user who forgot the password. 
LoginForm
•	Form Validation: The form validates the email and password inputs. The email must be a valid Gmail address, and the password must be at least 7 characters long without spaces.
•	Secure Input: Passwords are securely entered using the obscureText feature.
•	Login Process: After successful validation, the credentials are sent to the backend API for authentication.
API Communication
•	The form sends a POST request to a specified API endpoint with the email and password in JSON format.
•	If the response contains a valid token, it is stored securely using Hive and the user is navigated to the home_page.
Error Handling
•	If the login fails due to incorrect credentials or a server issue, an alert dialog is shown with the relevant error message.

Secure Storage
•	The JWT token received from the API is stored securely using Hive for persistent access across app sessions.

Dependencies
This project uses the following packages:
•	Hive: For secure local storage of the JWT token.
•	Shared Preferences: (Placeholder, currently not used in the code).
•	Flutter Secure Storage: For additional secure storage options.
•	HTTP: For making API calls.
Usage
To use the LoginScreen, simply navigate to it within your app's flow. The screen will handle user input, validate it, and manage the login process. Upon successful login, the user will be redirected to the main home page.

Basic_user info page

Overview
This Flutter project contains a BasicUserInfo widget, which provides a user interface for collecting and submitting basic user information, including name, email, password, age, gender, weight, and height. The form validates the inputs, registers the user with a backend server, and updates their profile. If the process is successful, the user is redirected to the home_page and their authentication token is securely stored using Hive.
Key Features
BasicUserInfo
•	UI Elements: The BasicUserInfo screen contains multiple text fields and a dropdown menu for collecting user data, as well as a submit button for sending the data to the server.
•	Responsive Layout: The screen uses a SingleChildScrollView to ensure that the content is scrollable and doesn't overlap with the keyboard.
Form Validation
•	Field Validation: The form validates each input field to ensure data integrity. For example, the email must be a valid Gmail address, the password must be at least 7 characters long without spaces, and age, weight, and height must be within specified ranges.
•	Error Handling: If validation fails, an error dialog is displayed, guiding the user to correct their input.
API Communication
•	User Registration: The form sends a POST request to the backend API with the user's name, email, and password for registration.
•	Profile Update: After successful registration, a PUT request is sent to update the user's profile with additional information (age, gender, weight, and height).
Error Handling
•	Registration and Profile Errors: If the registration or profile update fails, an error dialog is displayed with the relevant message.
•	Comprehensive Logging: Print statements are used throughout the code for debugging purposes, providing insights into the app's flow and any issues that arise.
Secure Storage
•	The JWT token received from the API upon successful registration is securely stored using Hive for persistent access across app sessions.
Dependencies
This project uses the following packages:
•	Hive: For secure local storage of the JWT token.
•	Shared Preferences: (Placeholder, currently not used in the code).
•	HTTP: For making API calls.
Usage
To use the BasicUserInfo screen, integrate it into your app's navigation flow. The screen handles user input, validates the data, and manages the user registration and profile update process. Upon success, the user is redirected to the main home page.

Home Page:

File Overview:
1.	Imports: The file imports several libraries and dependencies, including Flutter's core libraries, HTTP for making requests, and Hive for local storage.
2.	Home Page: The home_page widget has a bottom navigation bar and a body containing personalized greeting, buttons for suggestions and analysis, and widgets for water intake and exercise tracking.
3.	ProfileIcon Widget: Displays a small profile icon and user greeting.
4.	CardView Widget: Displays nutritional data like carbohydrates, fats, and proteins.
5.	WaterWidget and ExerciseWidget: Tracks water intake and workout hours.
6.	DynamicCardView Widget: Dynamically fetches nutritional data from an API and displays it in a card.
Key Features:
•	Navigation: The _onItemTapped function handles navigation when a bottom navigation item is tapped. Currently, only the Nutricalc page is implemented.
•	Dynamic Nutritional Data: The DynamicCardView fetches data asynchronously from an API using JWT-based authentication. It displays the daily intake of carbohydrates, fats, and proteins in comparison to the required amounts.
•	State Management: The app uses StatefulWidget for most widgets to handle state changes, especially for dynamic data fetching and user interactions like water intake and workout hours.
Enhancements:
•	Error Handling: The code includes error handling for data fetching with appropriate dialogs for user feedback.
•	Modularization: Components like the water intake and exercise tracking widgets are modularized for easy reuse and maintenance.
This file is designed to be a user-friendly interface for tracking nutrition, water intake, and exercise, with dynamic data loading from an external API, making it a comprehensive tool for health management.

NutriCalc Main Page:

1. Imports and Dependencies
•	The code imports several Flutter packages including Material, Hive, and http.
•	hive is used for local storage (to retrieve an authorization token), and http is used for making network requests.


2. Nutricalc Stateful Widget
•	The Nutricalc widget represents the main screen of the app, which is stateful, meaning it can change its UI based on user interaction.
3. State Variables
•	selectedValue: Tracks the currently selected food item.
•	selectedCardIndex: Tracks which meal category (Breakfast, Lunch, Snacks, Dinner) is currently selected.
•	itemsPerCard: A list of lists that stores the selected food items for each meal category.
4. Suggestion Builder
•	The getSuggestions method filters food items based on user input and displays them as suggestions. When a food item is selected, it is added to the currently selected meal category.
5. Sending Data to Server
•	sendFoodItemsToServer sends the selected food items to a backend server for nutrient calculation. It uses the http package to send a POST request containing the list of food items and a JWT token retrieved from Hive.
6. UI Components
•	Search Bar: A search bar is provided for searching and adding food items to the selected meal category.
•	Grid View: Displays the four meal categories as cards. Users can tap on a card to select it, and then add food items to that category.
•	Calculate Button: After selecting items, the user can press this button to send the data to the server. It also navigates to the SplashScreen.
7. Helper Methods
•	buildCard: Constructs each meal category card, displaying the food items within that category.
•	_showErrorDialog: Displays an error dialog if there is an issue sending data to the server or retrieving the token.
8. Enum for Food Items
•	The Foods enum lists all possible food items that users can select. Each item has a label used for display and comparison.

Analysis Page:

Key Features:
1.	Fetch User Profile & Nutritional Data:
o	The code retrieves the user's profile and daily nutritional data using HTTP requests.
o	It then calculates the required nutritional intake based on the user's age and gender.
2.	Display Data:
o	A line chart compares the required nutritional values against the user's actual intake for each day of the week.
o	A detailed table lists each nutrient, the required intake, the user's actual intake, and any deficit.
3.	Periodic Updates:
o	The data is refreshed every 5 minutes, ensuring it remains up-to-date.
4.	Error Handling:
o	If the token is missing or an HTTP request fails, an error dialog is shown to the user.
Improvements:
1.	Optimized Fetching Logic:
o	The data-fetching code is streamlined using Future.wait to gather required nutrients in parallel.
2.	State Management:
o	The code effectively handles state changes using setState.
3.	UI Components:
o	The buildHeaderCell and buildDataRow functions make it easy to create the table headers and rows.
4.	Responsive Design:
o	The app uses Expanded widgets to ensure that the table and charts adjust nicely across different screen sizes.

