var searchBtn = document.getElementById("search");
var input = document.getElementById("input");
var historyList = document.getElementById("history");
var city;
var searchHistory = [];
var getCities;



const searchCity = async () => {
    city = input.value;

    if(!city) return;

    let url = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=imperial&limit=1&q=${city}`;

    let weather = await (await fetch(url)).json();

    let {dt, main: {temp, humidity}, wind:{speed}, weather:[{icon}] } = weather.list[0];

    current.innerHTML = `
        <h2>${city} (${new Date(dt*1000).toDateString()}) <img src="http://openweathermap.org/img/wn/${icon}.png"> <h2>

        <h4>Temp: ${temp} °F</h4>
        <h4>Wind: ${speed} mph</h4>
        <h4>Humidity: ${humidity}%</h4>
    `;

    forecast.innerHTML = "";

    for (let i = 7; i < weather.list.length; i+=8) {

        let {dt, main: {temp, humidity}, wind:{speed}, weather:[{icon}] } = weather.list[i];

        forecast.innerHTML += `
        <div class="card">
            <h6>${new Date(dt*1000).toDateString().slice(0,-5)} <h6>
            <img src="http://openweathermap.org/img/wn/${icon}.png">

            <h6>Temp: ${temp} °F</h6>
            <h6>Wind: ${speed} mph</h6>
            <h6>Humidity: ${humidity}%</h6>
        </div>
    `;
    }

    saveCity();
};


searchBtn.addEventListener("click", searchCity);


function saveCity() {
    searchHistory.push(city);
  
    localStorage.setItem("stored-cities", city);
};


// historyList.innerHTML = searchHistory;



// getCity = localStorage.getItem("city", city);

// searchHistory.forEach(city => {
//     historyList.innerHTML += `<button onclick="searchCity('${getCity}')">${city}</button>`;
//   });




// for (var i = 0; i < searchHistory.length; i++ ) {
//     getCity = localStorage.getItem("city", city);
//     var listItem = document.createElement("p");
//     historyList.appendChild(listItem);
//     listItem.textContent = getCity;
//   };