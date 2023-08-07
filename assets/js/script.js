const apikey = "2b265a8a3022c8ba7b8d4c9a7af405b2"
var city = ""

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

