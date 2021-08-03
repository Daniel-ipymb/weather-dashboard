var searchButton = document.querySelector("#searchbutton")
var locationDisplay = document.querySelector(".location")
var tempDisplay = document.querySelector(".temp")
var dateDisplay1 = document.querySelector(".todays-date")
var windDisplay = document.querySelector(".wind")
var humidityDisplay = document.querySelector(".humidity")
var city = document.querySelector("#locationSearch")
var uvIndexDisplay = document.querySelector(".uv-index")
var searchBarDisplay = document.querySelector(".searchbar")
var iconDisplay1 = document.getElementById("todays-icon")
var listEl = document.querySelector(".pastsearches")
var APIKey = "cfc29ba71b193bfecbc6286a8f80f736"

function getWeather() {

  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city.value + "&units=imperial&appid=" + APIKey

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var locationDisplayValue = data.name;
      var dateDisplay1Unix = data.dt
      var dateDisplay1Value = moment.unix(dateDisplay1Unix).format(" MMM Do, YYYY");
      var tempDislayValue = Math.floor((data.main.temp - 32) * 0.5556)
      var windDisplayValue = Math.floor(data.wind.speed * 1.6)
      var humidityDisplayValue = data.main.humidity
      var iconDisplayValue = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png"


      locationDisplay.textContent = locationDisplayValue
      dateDisplay1.textContent = dateDisplay1Value
      tempDisplay.textContent = " " + tempDislayValue + "°C"
      windDisplay.textContent = windDisplayValue + " " + "km/h"
      humidityDisplay.textContent = humidityDisplayValue + "%"
      iconDisplay1.setAttribute("src", iconDisplayValue)


      longitude = data.coord.lon
      latitude = data.coord.lat

      UVIndex(longitude, latitude)

    })
    .catch(err => {
      alert("Invalid town, city or country. Please try again.");
    });
}

function UVIndex(longitude, latitude) {

  var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=" + APIKey

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      uvIndexDisplay.textContent = data.current.uvi

      if (data.current.uvi <= 2) {
        uvIndexDisplay.style.color = "darkgreen"
      } else if (data.current.uvi >= 8) {
        uvIndexDisplay.style.color = "red"
      } else (uvIndexDisplay.style.color = "orange")


    })
}

function fiveDayForecast() {
  var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city.value + "&units=imperial&appid=" + APIKey

  fetch(forecastQueryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      var forecastDates = []
      var forecastTemp = []
      var forecastWind = []
      var forecastHumidity = []
      var forecastIcons = []

      for (i = 0; i <= 39; i += 7) {
        var dates = moment.unix(data.list[i].dt).format("MMM Do, YYYY");
        forecastDates.push(dates)

        var temps = Math.floor((data.list[i].main.temp - 32) * 0.5556)
        forecastTemp.push(temps)

        var winds = Math.floor(data.list[i].wind.speed * 1.6)
        forecastWind.push(winds)

        var humid = data.list[i].main.humidity
        forecastHumidity.push(humid)

        var icons = "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png"
        forecastIcons.push(icons)
      }

      var forDay1 = document.getElementById("forecastDate1")
      var forDay2 = document.getElementById("forecastDate2")
      var forDay3 = document.getElementById("forecastDate3")
      var forDay4 = document.getElementById("forecastDate4")
      var forDay5 = document.getElementById("forecastDate5")

      var forIcon1 = document.getElementById("weatherIconFor1")
      var forIcon2 = document.getElementById("weatherIconFor2")
      var forIcon3 = document.getElementById("weatherIconFor3")
      var forIcon4 = document.getElementById("weatherIconFor4")
      var forIcon5 = document.getElementById("weatherIconFor5")

      var forTemp1 = document.getElementById("forecastTemp1")
      var forTemp2 = document.getElementById("forecastTemp2")
      var forTemp3 = document.getElementById("forecastTemp3")
      var forTemp4 = document.getElementById("forecastTemp4")
      var forTemp5 = document.getElementById("forecastTemp5")

      var forWind1 = document.getElementById("forecastWind1")
      var forWind2 = document.getElementById("forecastWind2")
      var forWind3 = document.getElementById("forecastWind3")
      var forWind4 = document.getElementById("forecastWind4")
      var forWind5 = document.getElementById("forecastWind5")

      var forHumidity1 = document.getElementById("forecastHumidity1")
      var forHumidity2 = document.getElementById("forecastHumidity2")
      var forHumidity3 = document.getElementById("forecastHumidity3")
      var forHumidity4 = document.getElementById("forecastHumidity4")
      var forHumidity5 = document.getElementById("forecastHumidity5")

      forDay1.innerHTML = forecastDates[1]
      forDay2.innerHTML = forecastDates[2]
      forDay3.innerHTML = forecastDates[3]
      forDay4.innerHTML = forecastDates[4]
      forDay5.innerHTML = forecastDates[5]

      forTemp1.innerHTML = forecastTemp[0] + "°C"
      forTemp2.innerHTML = forecastTemp[1] + "°C"
      forTemp3.innerHTML = forecastTemp[2] + "°C"
      forTemp4.innerHTML = forecastTemp[3] + "°C"
      forTemp5.innerHTML = forecastTemp[4] + "°C"

      forWind1.innerHTML = forecastWind[0] + " " + "km/h"
      forWind2.innerHTML = forecastWind[1] + " " + "km/h"
      forWind3.innerHTML = forecastWind[2] + " " + "km/h"
      forWind4.innerHTML = forecastWind[3] + " " + "km/h"
      forWind5.innerHTML = forecastWind[4] + " " + "km/h"

      forHumidity1.innerHTML = forecastHumidity[0] + "%"
      forHumidity2.innerHTML = forecastHumidity[1] + "%"
      forHumidity3.innerHTML = forecastHumidity[2] + "%"
      forHumidity4.innerHTML = forecastHumidity[3] + "%"
      forHumidity5.innerHTML = forecastHumidity[4] + "%"

      forIcon1.setAttribute("src", forecastIcons[0])
      forIcon2.setAttribute("src", forecastIcons[1])
      forIcon3.setAttribute("src", forecastIcons[2])
      forIcon4.setAttribute("src", forecastIcons[3])
      forIcon5.setAttribute("src", forecastIcons[4])
    }
    )
}

function clearField() {
  var citySearch = document.querySelector("#locationSearch")
  citySearch.value = ""
}

function saveInputs() {
  localStorage.setItem('city', city.value)

  renderInputs()
}

function renderInputs() {
  var savedCities = []
  var cityHistory = localStorage.getItem("city")
  savedCities.push(cityHistory)

  console.log(savedCities)

  for (i = 0; i < savedCities.length; i++) {

    var listItem = document.createElement("li")
    listItem.textContent = savedCities[i]
    listEl.appendChild(listItem)
  }
}

function goToLastSearch(event) {
  var listItems = event.target;
  if (event.target.matches("li")) {
    city.value = listItems.textContent;
    getWeather(city.value);
    fiveDayForecast(city.value)
  }

}

listEl.addEventListener("click", goToLastSearch)

searchButton.addEventListener("click", function () {
  getWeather();
  fiveDayForecast();
  saveInputs();
  clearField();


})