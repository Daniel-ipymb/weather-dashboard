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

function UVIndex(longitude,latitude){
 
  var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude +"&units=imperial&appid=" + APIKey 
  
    fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      uvIndexDisplay.textContent = data.current.uvi

      if(data.current.uvi <= 2){
        uvIndexDisplay.style.color = "darkgreen"
      } else if (data.current.uvi >= 8){
        uvIndexDisplay.style.color = "red"
      } else (uvIndexDisplay.style.color = "orange")

      
})}