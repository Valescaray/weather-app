const apiKey = 'd278844bfc4c4e9390211c4dc308ef03';

const weatherImages = {
    "clear": "weather-app-img/images/clear.png",
    "clouds": "weather-app-img/images/clouds.png",
    "rain": "weather-app-img/images/rain.png",
    "drizzle": "weather-app-img/images/drizzle.png",
    "mist": "weather-app-img/images/mist.png",
    "snow": "weather-app-img/images/snow.png",
    
};

async function getCurrentWeatherByCityName(cityName) {
    const apiUrl = `https://api.weatherbit.io/v2.0/current?city=${encodeURIComponent(cityName)}&key=${apiKey}`;

    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        document.querySelector(".temp").textContent = data.data[0].temp + "°C";
        document.querySelector(".location").textContent = data.data[0].city_name;
        document.querySelector(".text-overlay-2").textContent = data.data[0].wind_spd.toFixed(2) + "km/h";
        document.querySelector(".text-overlay-1").textContent = data.data[0].rh + "%";

         
        const description = data.data[0].weather.description;
        const words = description.toLowerCase().split(' ');
        for (const word of words) {
            if (weatherImages.hasOwnProperty(word)) {
                document.querySelector(".image").src = weatherImages[word];
                break; 
            }
        }
    } catch (error) {
        console.error('Error fetching current weather data by city name:', error);
        throw error;
    }
}



const city = document.querySelector(".input");

const search = document.querySelector(".search-icon");

search.addEventListener("click", () => {
    cityName = city.value;
    getCurrentWeatherByCityName(cityName);
})



