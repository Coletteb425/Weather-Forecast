// function displaying weather info from API
function displayWeather(response) {
  let date = new Date(response.data.time * 1000);
  let currentDateELement = document.querySelector("#formatDate");

  currentDateELement.innerHTML = formattedDate(date);
  let city = response.data.city;
  let country = response.data.country;

  if (
    response.data.country ===
    "United Kingdom of Great Britain and Northern Ireland"
  )
    country = "UK";
  if (response.data.country === "United States of America") country = "USA";
  else response.data.country;
  if (response.data.message === "City not found")
    alert("City not found please try again");
  console.log(response.data);
  tempC = response.data.temperature.current;
  let humidity = response.data.temperature.humidity;
  let wind = response.data.wind.speed;
  let description = response.data.condition.description;

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
  if (description.includes("cloud"))
    document.body.style.backgroundImage = "url(Media/cloudy.jpg)";
  if (description.includes("clear"))
    document.body.style.backgroundImage = "url(Media/sunny.jpg)";
  if (description.includes("rain"))
    document.body.style.backgroundImage = "url(Media/rainy.jpg)";
  if (response.data.condition.icon.includes("night"))
    document.body.style.backgroundImage = "url(Media/night.jpeg)";
  if (response.data.condition.icon.includes("thunderstorm"))
    document.body.style.backgroundImage = "url(Media/thunder.jpg)";
  let iconElement = document.querySelector("#bigIcon");
  iconElement.innerHTML = `<img class="bigIcon" src="${response.data.condition.icon_url}" alt="weather icon">`;
}
function formattedDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}
function citySearch(city) {
  let apiKey = "05t403db42bffa02aad4f14o376ac090";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
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
