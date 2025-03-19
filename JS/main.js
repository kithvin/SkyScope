// Select DOM elements
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

// API key for fetching weather data
const apikey = "9c4c35b5216a2c378d57112c8af7b6ee";

// Event listener for form submission
weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent page refresh on form submission

  const city = cityInput.value.trim(); // Get user input and remove extra spaces

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError("Could not fetch weather data. Please try again.");
    }
  } else {
    displayError("Please enter a city.");
  }
});

// Function to fetch weather data from OpenWeather API
async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  return await response.json();
}

// Function to display the fetched weather information
function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  card.textContent = ""; // Clear previous content
  card.style.display = "flex";

  // Create elements for displaying weather information
  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  // Set text content with appropriate formatting
  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`; // Convert Kelvin to Celsius
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);

  // Add CSS classes for styling
  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");

  // Append elements to the card container
  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);
}

// Function to return a weather emoji based on weather condition ID
function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "⛈️"; // Thunderstorm
    case weatherId >= 300 && weatherId < 400:
      return "🌦️"; // Drizzle
    case weatherId >= 500 && weatherId < 600:
      return "🌧️"; // Rain
    case weatherId >= 600 && weatherId < 700:
      return "❄️"; // Snow
    case weatherId >= 700 && weatherId < 800:
      return "🌫️"; // Atmosphere (fog, mist, etc.)
    case weatherId === 800:
      return "☀️"; // Clear sky
    case weatherId >= 801 && weatherId < 810:
      return "☁️"; // Clouds
    default:
      return "❓"; // Unknown weather condition
  }
}

// Function to display error messages
function displayError(message) {
  card.textContent = ""; // Clear previous content
  card.style.display = "flex";

  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.appendChild(errorDisplay);
}
