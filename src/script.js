let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minuts = now.getMinutes();
if (minuts < 10) {
  minuts = `0${minuts}`;
}

let currentlyDate = document.querySelector("#currently-date");
currentlyDate.innerHTML = `${day} ${hours}:${minuts}`;

// 🕵️‍♀️Feature #2
function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureNow = document.querySelector("#current-temperature");
  temperatureNow.innerHTML = Math.round(response.data.main.temp);
  let currentCity = response.data.name;
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = currentCity;
  let weather = response.data.weather[0].main;
  let weatherDescription = document.querySelector("#weather");
  weatherDescription.innerHTML = weather;
  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#windSpeed");
  windSpeed.innerHTML = wind;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  function cToF(event) {
    event.preventDefault();
    let currentTemperature = document.querySelector("#current-temperature");
    currentTemperature.innerHTML = temperatureFahrenheit;
  }

  function cToC(event) {
    event.preventDefault();
    let currentTemperature = document.querySelector("#current-temperature");
    currentTemperature.innerHTML = temperatureCelsius;
  }

  let temperatureFahrenheit = Math.round((temperature * 9) / 5 + 32);
  let temperatureCelsius = Math.round(((temperatureFahrenheit - 32) * 5) / 9);

  let imperial = document.querySelector("#imperial");
  imperial.addEventListener("click", cToF);

  let metric = document.querySelector("#metric");
  metric.addEventListener("click", cToC);
}

function searchCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-city");
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = `${searchCity.value}`;
  let city = searchCity.value;
  if (city === "") {
    alert("Type a city!");
  }
  let apiKey = "860949625d49936c19736b773a04ad68";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let search = document.querySelector("#search");
search.addEventListener("click", searchCity);

// // 🙀Bonus Feature

function showCurrentWeatherHere(event) {
  event.preventDefault();
  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=860949625d49936c19736b773a04ad68`;
    axios.get(apiUrl).then(showWeather);
  }

  navigator.geolocation.getCurrentPosition(showPosition);
}
let current = document.querySelector("#current");
current.addEventListener("click", showCurrentWeatherHere);

let url = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=860949625d49936c19736b773a04ad68&units=metric`;
axios.get(url).then(showWeather);
