console.log("geht");
// ! Variablen
const input = document.querySelector(".input");
const searchBtn = document.getElementById("searchBtn");
const weatherImg = document.querySelector(".weatherImg");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const locationNotFound = document.querySelector(".locationNotFound");
const weatherContainer = document.querySelector(".weatherContainer");
const timeOnTargetOutput = document.querySelector("#timeOnTarget");
const sunset = document.querySelector("#sunset");
const sunrise = document.querySelector("#sunrise");
const geoCoordinatesOutput = document.querySelector("#geoCoordinates");
const inputOutput = document.querySelector(".inputOutput");
const berlinBtn = document.querySelector(".berlin");
const londonBtn = document.querySelector(".london");
const newYorkBtn = document.querySelector(".newYork");
const sanFranciscoBtn = document.querySelector(".sanFrancisco");
const tokyoBtn = document.querySelector(".tokyo");
const moskauBtn = document.querySelector(".moskau");
const kapstadtBtn = document.querySelector(".kapstadt");
const singapourBtn = document.querySelector(".singapour");

// ! Funktion um Sekunden Zeitstempel auf eine Uhzreit umzurechnen
function convertUnixTimestampToTime(unixTimestamp, timezoneOffset) {
  const date = new Date(unixTimestamp * 1000 + timezoneOffset * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
}

// ! API Abrufen
function checkWeather(city) {
  const api_key = "a1575f46509be3ef770e0d4090a465af";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&lang=de`;

  //! API Fetchen
  fetch(url)
    .then((response) => response.json())
    .then((weather_data) => {
      console.log(weather_data);
      // // Felhermeldung wenn Location nicht gefunden wurde.
      if (weather_data.cod === `404`) {
        locationNotFound.style.display = "flex";
        weatherContainer.style.display = "none";
        console.log("error");
        return;
      }
      // // Ausgewählt Stadt im HTML anzeigen
      inputOutput.innerHTML = city;

      // // passendes Icon zum Wetter aus der API
      const iconId = weather_data.weather[0].icon;
      console.log(iconId);
      const iconURL = `https://openweathermap.org/img/wn/${iconId}@2x.png`;
      console.log(iconURL);
      weatherImg.src = iconURL;

      // // Temperatur berechnen
      weatherContainer.style.display = "flex";
      temperature.innerHTML = `${Math.round(
        weather_data.main.temp - 273.15
      )}°C`;

      // // Wetter beschreibung aus API holen
      description.innerHTML = `${weather_data.weather[0].description}`;

      // // Aktuelle Zeit am Zielort
      const timezoneOffset = weather_data.timezone;
      console.log(timezoneOffset);
      const currentTimestamp = Date.now() / 1000;
      console.log(currentTimestamp);
      const timeOnTarget = convertUnixTimestampToTime(
        currentTimestamp,
        timezoneOffset
      );
      console.log(timeOnTarget);

      // // Zeit für Sonnenuntergang
      const sunriseTimestamp = weather_data.sys.sunrise;
      const sunriseTime = convertUnixTimestampToTime(
        sunriseTimestamp,
        timezoneOffset
      );
      console.log(sunriseTime);

      // // Zeit für Sonnenaufgang
      const sunsetTimestamp = weather_data.sys.sunset;
      const sunsetTime = convertUnixTimestampToTime(
        sunsetTimestamp,
        timezoneOffset
      );
      console.log(sunsetTime);

      // // Daten aus API ins HTML schreiben
      humidity.innerHTML = `${weather_data.main.humidity}%`;
      windSpeed.innerHTML = `${weather_data.wind.speed}m/s`;
      timeOnTargetOutput.innerHTML = timeOnTarget;
      sunrise.innerHTML = sunriseTime;
      sunset.innerHTML = sunsetTime;
      geoCoordinatesOutput.innerHTML = `${weather_data.coord.lat},</br>${weather_data.coord.lon}`;

      locationNotFound.style.display = "none";
    })
    // // Error
    .catch((error) => {
      console.error(error);
    });
}
// ! Buttons
searchBtn.addEventListener("click", () => {
  checkWeather(input.value);
});
berlinBtn.addEventListener("click", () => {
  console.log(berlinBtn.value);
  checkWeather(berlinBtn.value);
});
londonBtn.addEventListener("click", () => {
  console.log(londonBtn.value);
  checkWeather(londonBtn.value);
});
newYorkBtn.addEventListener("click", () => {
  console.log(newYorkBtn.value);
  checkWeather(newYorkBtn.value);
});
sanFranciscoBtn.addEventListener("click", () => {
  console.log(sanFranciscoBtn.value);
  checkWeather(sanFranciscoBtn.value);
});
tokyoBtn.addEventListener("click", () => {
  console.log(tokyoBtn.value);
  checkWeather(tokyoBtn.value);
});
moskauBtn.addEventListener("click", () => {
  console.log(moskauBtn.value);
  checkWeather(moskauBtn.value);
});
kapstadtBtn.addEventListener("click", () => {
  console.log(kapstadtBtn.value);
  checkWeather(kapstadtBtn.value);
});
singapourBtn.addEventListener("click", () => {
  console.log(singapourBtn.value);
  checkWeather(singapourBtn.value);
});
