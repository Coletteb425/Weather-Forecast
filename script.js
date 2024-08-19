function formatDate(props) {
  let now = new Date(props);
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  return `${day}, ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
// function displaying weather info from API
function displayWeather(response) {
  let city = response.data.name;
  let country = response.data.sys.country;
  tempC = response.data.main.temp;
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let description = response.data.weather[0].description;
  let datum = 1000 * response.data.dt;
  //     !!!                  to ADD: time, forecast
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = `${city}, ${country}`;
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(tempC);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = humidity;
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = Math.round(wind);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = description;
  let datumElement = document.querySelector("#formatDate");
  datumElement.innerHTML = formatDate(datum);
}
function citySearch(city) {
  let apiKey = "b61fef651891eb9cf133b7845c0e062a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
// search engine
function citySubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  if (cityInputElement.value) {
    let city = cityInputElement.value;
    citySearch(city);
  } else {
    alert(`Please enter a city to submit your search.`);
  }
}
function unitCelsius(event) {
  event.preventDefault();
  fahrenheitTemp.classList.remove("active");
  celsiusTemp.classList.add("active");
  let currentTempC = document.querySelector("#temp");
  currentTempC.innerHTML = Math.round(tempC);
}
//
function unitFahrenheit(event) {
  event.preventDefault();
  let tempF = tempC * 1.8 + 32;
  celsiusTemp.classList.remove("active");
  fahrenheitTemp.classList.add("active");
  let currentTempF = document.querySelector("#temp");
  currentTempF.innerHTML = Math.round(tempF);
}
let fahrenheitTemp = document.querySelector("#fahrenheit");
fahrenheitTemp.addEventListener("click", unitFahrenheit);
let celsiusTemp = document.querySelector("#celsius");
celsiusTemp.addEventListener("click", unitCelsius);
let tempC = null;
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", citySubmit);
citySearch("London");
