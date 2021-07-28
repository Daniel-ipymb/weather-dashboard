var openWxAPIKey = "cfc29ba71b193bfecbc6286a8f80f736";
//Search Button
var searchBtn = document.getElementById('searchBtn');
//Search History
var searchHistory = JSON.parse(localStorage.getItem("cities")) || [];
//Current Weather Heading
var cityDateIcon = document.getElementById('cityDateIcon');
//Today's date
var todayDate = moment().format("YYYY/MM/D");
//Current Wx Icon
var currentWxIcon = document.getElementById('currentWxIcon');
//Current Wx List
var currentWxList = document.getElementById('currentWxList');

