import "./reset.css";
import "./style.css";
import getWeatherData from "./modules/weather";

const app = document.querySelector("#app");

createApp();

function createApp() {
  const cardHolder = document.createElement("div");
  cardHolder.classList.toggle("card-holder");

  const inputField = createInputField(cardHolder);

  app.appendChild(inputField);
  app.appendChild(cardHolder);
}

function createInputField(cardHolder) {
  const inputHolder = document.createElement("div");
  inputHolder.classList.toggle("input-holder");

  const cityInputLabel = document.createElement("label");
  cityInputLabel.htmlFor = "city-input";
  cityInputLabel.textContent = "City ";

  const cityInput = document.createElement("input");
  cityInput.type = "text";
  cityInput.id = "city-input";

  cityInput.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      let weatherData = await getWeatherData(cityInput.value);
      if (weatherData) {
        console.log(weatherData);
        for (let city of weatherData.reverse()) {
          console.log(city);
          cardHolder.prepend(createCityWeatherCard(city));
        }
      } else {
        cityInput.placeholder = "Can't find city";
      }
      cityInput.value = "";
    }
  });

  inputHolder.appendChild(cityInputLabel);
  inputHolder.appendChild(cityInput);

  return inputHolder;
}

function createCityWeatherCard(weatherData) {
  const cityWeatherCardWrapper = document.createElement("div");
  cityWeatherCardWrapper.classList.toggle("city-weather-card");

  const weatherIcon = document.createElement("img");
  weatherIcon.classList.toggle("weather-icon");
  weatherIcon.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

  const temperature = document.createElement("p");
  temperature.classList.toggle("temperature");
  temperature.textContent = `${weatherData.main.temp} °C`;

  const liddleHolder = document.createElement("div");
  liddleHolder.classList.toggle("liddle-holder");

  const pressure = document.createElement("p");
  pressure.classList.toggle("pressure");
  pressure.textContent = `Pressure: ${weatherData.main.pressure}mbar`;

  const humidity = document.createElement("p");
  humidity.classList.toggle("humidity");
  humidity.textContent = `Humidity: ${weatherData.main.humidity}%`;

  const wind = document.createElement("p");
  wind.classList.toggle("wind");
  wind.textContent = `Wind: ${weatherData.wind.speed}m/s`;

  liddleHolder.appendChild(pressure);
  liddleHolder.appendChild(humidity);
  liddleHolder.appendChild(wind);

  const rightHolder = document.createElement("div");
  rightHolder.classList.toggle("right-holder");

  const cityName = document.createElement("p");
  cityName.classList.toggle("city-name");
  cityName.textContent = weatherData.name;

  const countryName = document.createElement("span");
  countryName.classList.toggle("country-name");
  countryName.textContent = weatherData.sys.country;

  const date = document.createElement("p");
  date.classList.toggle("date");
  date.textContent = new Date().toJSON().slice(0, 10).replace(/-/g, "/");

  const weatherDescription = document.createElement("p");
  weatherDescription.classList.toggle("weather-description");
  weatherDescription.textContent = weatherData.weather[0].description;

  rightHolder.appendChild(cityName);
  rightHolder.appendChild(countryName);
  rightHolder.appendChild(date);
  rightHolder.appendChild(weatherDescription);

  cityWeatherCardWrapper.appendChild(weatherIcon);
  cityWeatherCardWrapper.appendChild(temperature);
  cityWeatherCardWrapper.appendChild(liddleHolder);
  cityWeatherCardWrapper.appendChild(rightHolder);

  return cityWeatherCardWrapper;
}
