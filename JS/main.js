// Select DOM elements for the weather form, city input, and card container
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

// API key for fetching weather data (Replace with your actual API key)
const apikey = "9c4c35b5216a2c378d57112c8af7b6ee";

// Event listener for form submission
weatherForm.addEventListener("submit", async event => {
  event.preventDefault(); // Prevents the form from refreshing the page

  const city = cityInput.value; // Get the city name entered by the user

  // If the city input is not empty, proceed to fetch weather data
  if (city) {
    try {
      const weatherData = await getWeatherData(city); // Fetch weather data
      displayWeatherInfo(weatherData); // Display weather info on successful fetch
    } catch (error) {
      console.error(error); // Log any errors
      displayError(error); // Display the error message to the user
    }
  } else {
    displayError("Please Enter a City"); // Show an error if no city is entered
  }
});

// Function to fetch weather data based on the city name
async function getWeatherData(city) {

    // Construct the API URL using the city and API key

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`

    // Fetch the data from the API

    const response = await fetch(apiUrl);

    // If the response is not OK (there was an error), throw an error

    if(!response.ok){

        throw new Error("Could not fetch weather data");
    }

    // Return the data in JSON format

        return await response.json();
}

// Function to display the weather information on the page

function displayWeatherInfo(data) {

    // Destructure the weather data for easy access

    const {name: city, 
        main: {temp, humidity}, 
        weather: [{description, id}]} = data;
  
    // Clear any previous weather data and display the card
    card.textContent = "";
    card.style.display = "flex";

    // Create elements to display the weather data
    const cityDisplay =  document.createElement("h1");
    const tempDisplay =  document.createElement("p");
    const humidityDisplay =  document.createElement("p");
    const descDisplay =  document.createElement("p");
    const weatherEmoji =  document.createElement("p");
    
    // Set the text content for the elements
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`; // Convert temperature from Kelvin to Celsius
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id); // Call the function to get the emoji
    
    // Add CSS classes for styling the elements
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");
    
    // Append the elements to the card container
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);

}

// Function to return an emoji based on the weather condition ID
function getWeatherEmoji(weatherId) {


  
}

// Function to display error messages in the card container
function displayError(message) {
  // Create a paragraph element to display the error message
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message; // Set the error message text
  errorDisplay.classList.add("errorDisplay"); // Apply CSS styling for error display

  // Clear any previous content in the card container and make it visible
  card.textContent = "";
  card.style.display = "flex"; // Ensure the card is visible to show the error
  card.appendChild(errorDisplay); // Append the error message to the card container
}
