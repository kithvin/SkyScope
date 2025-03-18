// Select the weather form, city input field, and the card container
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

// API key for fetching weather data (Replace with actual API key)
const apikey = "9c4c35b5216a2c378d57112c8af7b6ee";

// Event listener for form submission
weatherForm.addEventListener("submit", event => {
  
    event.preventDefault(); // Prevent the form from refreshing the page

    const city = cityInput.value; // Get the value entered in the input field

    if (city) {
        // Call function to fetch weather data (to be implemented)
    } else {
        displayError("Please Enter a City"); // Show error message if input is empty
    }
});

// Function to fetch weather data from API (Implementation needed)
async function getWeatherData(city) {
    // Fetch data from weather API using the city name
}

// Function to display weather information (Implementation needed)
function displayWeatherInfo(data) {
    // Process and display the weather details in the UI
}

// Function to return weather-related emoji based on weather ID (Implementation needed)
function getWeatherEmoji(weatherId) {
    // Return appropriate emoji based on weather condition ID
}

// Function to display error messages
function displayError(message) {
  
    // Create a paragraph element to show the error message
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message; // Set error text
    errorDisplay.classList.add("errorDisplay"); // Add CSS class for styling

    // Clear any previous content inside the card and make it visible
    card.textContent = "";
    card.style.display = "flex"; // Change display property to show error message
    card.appendChild(errorDisplay); // Add error message to the card
}
