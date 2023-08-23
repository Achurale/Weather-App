const apikey = "2b265a8a3022c8ba7b8d4c9a7af405b2"
var city = "Minneapolis"
const cityNameSpan = document.getElementById('cityName')
let cityLat = ""
let cityLon = ""

// Function to update weather forecast data
function updateWeatherData(data) {
    

    // Update the content of the spans with the forecast data
    for (let i = 5; i < 40; i=i+8) {
        cityNameSpan.textContent = city;
        // Get the month and day of date of item 0
        const todayString = data.list[0].dt_txt
        const todayDate = new Date(todayString)
        const todayMonth = todayDate.getMonth()+1
        const todayDay = todayDate.getDate();
        // Get weather data for item 0
        const todayTemp = data.list[0].main.temp;
        const todayHumid = data.list[0].main.humidity;
        const todayWind = data.list[0].wind.speed;
        // Grab spans for big card
        const currentDateSpan = document.getElementById(`currentDate`)
        const currentTempSpan = document.getElementById(`currentTemp`);
        const currentHumidSpan = document.getElementById(`currentHumidity`);
        const currentWindSpan = document.getElementById(`currentWind`);
        // Set the info for the big card
        currentDateSpan.textContent = ` ${todayMonth}-${todayDay}`
        currentTempSpan.textContent = ` ${todayTemp} °F`;
        currentHumidSpan.textContent = ` ${todayHumid} %`;
        currentWindSpan.textContent = ` ${todayWind} mph`;
        // Grab info for icon and display it
        const todayIcon = data.list[0].weather[0].icon;
        const todayIconUrl = `http://openweathermap.org/img/wn/${todayIcon}.png`
        const img1 = document.createElement('img')
        img1.src = todayIconUrl
        const todayIconSpan = document.getElementById('weatherIcon')
        // Check for existing icons and replace them
        const existingTodayIcon = todayIconSpan.querySelector('img')
        if (existingTodayIcon) {
            todayIconSpan.replaceChild(img1, existingTodayIcon)
        } else {
        todayIconSpan.appendChild(img1)
        }

        // Get the month and day of the date for small cards
        const dateString = data.list[i].dt_txt
        const date = new Date(dateString)
        const month = date.getMonth() + 1
        const day = date.getDate();
        // Get weather data for small cards
        const temp = data.list[i].main.temp;
        const humid = data.list[i].main.humidity;
        const wind = data.list[i].wind.speed;
        // Grab spans for small cards
        const dateSpan = document.getElementById(`date${i}`)
        const tempSpan = document.getElementById(`Temp${i}`);
        const humidSpan = document.getElementById(`Humidity${i}`);
        const windSpan = document.getElementById(`Wind${i}`);
        // Set the info for small cards
        dateSpan.textContent = ` ${month}-${day}`
        tempSpan.textContent = ` ${temp} °F`;
        humidSpan.textContent = ` ${humid} %`;
        windSpan.textContent = ` ${wind} mph`;
        // Grab info for icon and display it
        const icon = data.list[i].weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`
        const cardIcon = document.createElement('img')
        cardIcon.src = iconUrl
        const IconSpan = document.getElementById(`icon${i}`)
        // Check for existing icons and replace them
        const existingIcon = IconSpan.querySelector('img')
        if (existingIcon) {
            IconSpan.replaceChild(cardIcon, existingIcon)
        } else {
        IconSpan.appendChild(cardIcon)
        }
    }
}

// Function to fetch the data and call upon above function
function fetchWeatherData(city) {
    // Geocoder API, fetch lat and lon variables for the forecast api
    const cityLatLong = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apikey}`;

    fetch(cityLatLong)
        .then(response => {
            if(!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`)
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            cityLat = data[0].lat;
            cityLon = data[0].lon;
            console.log('lat', cityLat)
            console.log('long', cityLon)

            // Fetch weather data here
            const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=${apikey}&units=imperial`;
            console.log(forecastUrl)
            return fetch(forecastUrl)
        })

        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            updateWeatherData(data);

            console.log(data)
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