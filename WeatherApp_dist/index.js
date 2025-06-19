const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");



weatherForm.addEventListener("submit", async event => {

    event.preventDefault();
    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);

        }catch(error){
            console.error(error);
            displayError(error);
        }

    }else{
        displayError("Please enter a city");
    }


});

async function getWeatherData(city) {
    const response = await fetch(`${window.location.origin}/api/weather?city=${encodeURIComponent(city)}`);

    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}


function  displayWeatherInfo(data){
    console.log(data);
    const{
        name: city,
        main: {temp, humidity},
        weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("h2");
    const humidityDisplay = document.createElement("p");
    const desDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent =`Humidity: ${humidity}`;
    desDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);



    tempDisplay.classList.add("tempDisplay");
    cityDisplay.classList.add("cityDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    desDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(desDisplay);
    card.appendChild(weatherEmoji);
    

}

function getWeatherEmoji(weatherID){
    console.log(weatherID);
    switch(true){
        case(weatherID >= 200 && weatherID < 300):
            return "⛈️";
        case(weatherID >= 300 && weatherID < 400):
            return "🌧️";
        case(weatherID >= 500 && weatherID < 600):
            return "🌧️";
        case(weatherID >= 600 && weatherID < 700):
            return "❄️";
        case(weatherID >= 700 && weatherID < 800):
            return "🌫️";
        case(weatherID === 800):
            return "☀️";
        case(weatherID >= 801 && weatherID < 811):
            return "☁️"

        default:
            return "❓"
  
    }

}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");


    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);

}



















