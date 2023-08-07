const apikey = "2b265a8a3022c8ba7b8d4c9a7af405b2"
var city = "Minneapolis"
const cityNameSpan = document.getElementById('cityName')

// Function to update weather forecast data
function updateWeatherData(data) {
    const forecasts = data.list; // Array of forecast data

    // Update the content of the spans with the forecast data
    for (let i = 0; i < forecasts.length; i++) {
        const forecast = forecasts[i];
        const temp = forecast.main.temp;
        const humid = forecast.main.humidity;
        const wind = forecast.wind.speed;
        
        const tempSpan = document.getElementById(`Temp${i}`);
        const humidSpan = document.getElementById(`Humidity${i}`);
        const windSpan = document.getElementById(`Wind${i}`);
        cityNameSpan.textContent = city;

        tempSpan.textContent = ` ${temp} °F`;
        humidSpan.textContent = ` ${humid} %`;
        windSpan.textContent = ` ${wind} mph`;
    }
}

// Function to fetch the data and call upon above function
function fetchWeatherData(city) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=imperial`;

    fetch(forecastUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            updateWeatherData(data);
            console.log(forecasts)
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

// Call the function initially
fetchWeatherData(city);

const searchBarButton = document.getElementById('searchButton')

searchBarButton.addEventListener('click', () => {
    const searchBar = document.getElementById('searchBar')
    const historyDiv = document.getElementById('history')
    const searchedCityName = searchBar.value.trim();

    if (searchedCityName !== ''){
        // Update city variable and fetch new weather data
        city = searchedCityName;
        fetchWeatherData(city)

        // Create the button
        const historyButton = document.createElement('button')
        historyButton.textContent = searchedCityName;
        historyButton.className = 'col-10 m-auto rounded'

        // Append to div
        historyDiv.appendChild(historyButton);

        // Add event listener for newly made button to change selected city
        const buttonText = historyButton.textContent
        historyButton.addEventListener('click', () => {
            cityNameSpan.textContent = buttonText
            city = buttonText
            fetchWeatherData(city)
        })

        // Update cards with city name
        cityNameSpan.textContent = historyButton.textContent;

    }

    // Reset search bar
    searchBar.value = '';
})