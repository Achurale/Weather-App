const apikey = "2b265a8a3022c8ba7b8d4c9a7af405b2"
var city = "Minneapolis"

const weatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`

fetch(weatherurl) .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok: ${response.status}');
    }
    return response.json();
}) .then(data => {
    var temp = data.main.temp;
    var humid = data.main.humidity;
    var wind = data.wind.speed;

    console.log('Temperature:', temp, 'C')
    console.log('Humidity:', humid, '%')
    console.log('Wind:', wind, 'm/s')
}) .catch(error => {
    console.error('Fetch error:', error);
})

const searchBarButton = document.getElementById('searchButton')

searchBarButton.addEventListener('click', () => {
    const searchBar = document.getElementById('searchBar')
    const historyDiv = document.getElementById('history')
    const searchedCityName = searchBar.value;
    const cityNameSpan = document.querySelectorAll('.cityName')

    if (searchedCityName !== ''){
        // Create the button
        const historyButton = document.createElement('button')
        historyButton.textContent = searchedCityName;
        historyButton.className = 'col-10 m-auto rounded'

        // Append to div
        historyDiv.appendChild(historyButton);

        // Add event listener for newly made button to change selected city
        const buttonText = historyButton.textContent
        historyButton.addEventListener('click', () => {
             cityNameSpan.forEach(span => {
            span.textContent = buttonText;
        })
        })

        // Update cards with city name
        cityNameSpan.forEach(span => {
            span.textContent = historyButton.textContent;
        })

    }

    // Reset search bar
    searchBar.value = '';
})